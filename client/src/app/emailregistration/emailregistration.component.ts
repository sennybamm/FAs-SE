import {Component, Inject, OnInit} from '@angular/core';
import {AccountDataServerService} from "../service/account-data-server.service";
import {Router} from "@angular/router";
import {Account} from "../entity/Account";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Config} from "protractor";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs/internal/observable/throwError";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {EmailregistrationDialogComponent} from "../emailregistration-dialog/emailregistration-dialog.component";
import {Overlay} from "@angular/cdk/overlay";

export interface DialogData{
  type: string;
  title: string
  detail: string;
}

@Component({
  selector: 'app-emailregistration',
  templateUrl: './emailregistration.component.html',
  styleUrls: ['./emailregistration.component.css']
})
export class EmailRegistrationComponent implements OnInit {
  emailRegisterForm: FormGroup;
  account: any = {};
  type: string;
  title: string;
  detail: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private accountDataServerService: AccountDataServerService, private dialog: MatDialog, private overlay: Overlay) {}

  ngOnInit() {
    this.account = new Account();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(EmailregistrationDialogComponent, {
      width: '350px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      hasBackdrop: false,
      data: {type: this.type,title:this.title, detail: this.detail}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(account: Account){
    console.log(account);
    if(account.password == account.confirmPassword){
      this.checkUsernameIsRepeat(account);
    }else{
      console.log("Confirm-Password not matching with Password");
      this.type="Error";
      this.title= "Can not register the account to the system"
      this.detail="Confirm-Password not matching with Password"
      this.openDialog();
    }
  }

  checkUsernameIsRepeat(account:Account) {
    this.accountDataServerService.getAccountByUsername(account.username)
      .subscribe(
        data => {
          console.log(data);
          if(data==null) {
            this.checkEmailIsRepeat(account);
          }else{
            console.log("Repeated data: username");
            this.type="Er" +
              "ror";
            this.title= "Can not register the account to the system"
            this.detail="Username is repeated."
            this.openDialog();
          }
        }, error => this.handleError(error)
      );
  }

  checkEmailIsRepeat(account:Account){
    this.accountDataServerService.getAccountByEmail(account.email)
      .subscribe(
        data=> {
          console.log(data);
          if(data==null){
            this.register(account)

            //window.location.href = "http://localhost:4200/waiting";
          }else {
            console.log("Repeated data: email");
            this.type="Error";
            this.title= "Can not register the account to the system"
            this.detail="Email is repeated."
            this.openDialog();
          }
        }, error => this.handleError(error)
      );
  }

  register(account: Account){
    this.accountDataServerService.sendAccount(account)
      .subscribe(data => {
        console.log(data);
          setTimeout(() =>
          {
            this.router.navigate(['/waiting']);
          },
          5000);
        /!*this.router.navigate(['/waiting']);*!/
      },error => console.log(error));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
