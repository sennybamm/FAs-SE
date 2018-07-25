package camt.se.fas;

import camt.se.fas.entity.Account;
import camt.se.fas.service.EmailService;
import camt.se.fas.service.EmailServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceTest {
    EmailService emailService = new EmailServiceImpl();

    @Test
    public void test_sendEmail_canSending(){
        Assert.assertEquals(true, emailService.sendEmail(new Account("FA00002",
                "Marisa1512",
                "Zxcv4321",
                "natrada_chairat@cmu.ac.th",
                null,
                null,
                null,
                null,
                "092639169",
                null,
                null,
                null)));
    }
}
