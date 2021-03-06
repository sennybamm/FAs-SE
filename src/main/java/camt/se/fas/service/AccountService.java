package camt.se.fas.service;

import camt.se.fas.entity.Account;
import com.google.firebase.auth.FirebaseAuthException;

import java.util.concurrent.ExecutionException;

public interface AccountService {
    String registerAccount(Account account) throws FirebaseAuthException, ExecutionException, InterruptedException;
    Boolean registerAccountInfo(Account account) throws ExecutionException, InterruptedException, FirebaseAuthException;
    Boolean checkDuplicatedStudentId(String studentId) throws ExecutionException, InterruptedException;
    Boolean checkDuplicatedPhonenumber(String phonenumber) throws ExecutionException, InterruptedException;
    String getEmailByUID(String uid) throws FirebaseAuthException;
    String getPhonenumberByUID(String uid) throws FirebaseAuthException;
    Boolean updateStatus(Account account, String status) throws ExecutionException, InterruptedException, FirebaseAuthException;
}
