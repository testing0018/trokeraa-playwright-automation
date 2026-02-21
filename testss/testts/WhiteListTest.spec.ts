import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import WhiteListBankPage from '../pages/WhiteListBankPage';

// whitelistBank

const WhiteListBankData = [

      {
      selectBank: 'Banco Cuscatlan',
      Account: '88889',
      ConfirmAccount: '88889',
      AccountType: 'test'
       }

        {
          selectBank: 'Banco Cuscatlan',
          Account: '',
          ConfirmAccount: '88889',
          AccountType: 'test'
            }

    ];

 for ( const data of WhiteListBankData){
     test(`whitelistBank | ${JSON.stringify(data)}`,async({ page, browser }) =>{
         const login = new LoginPage(page);
         const bank = new WhiteListBankPage(page);

         //login before test
       await login.open();
       await login.enterEmail('ajith.vb@hivelance.com');
       await login.enterPassword('Vishwa@123');
       await login.clickSignIn();
       await login.enterValidTfaCode();
       await login.clickTfaSubmit();

       // WhiteListBank
        // whitelist bank
           await bank.openUSD();
           await bank.openWhitelist();
           await bank.selectBank(data.selectBank);
          // await bank.enterClabeId(data.clabeId);
           await bank.enterAccount(data.Account);
           await bank.enterConfirmAccount(data.ConfirmAccount);
           await bank.enterAccountType(data.AccountType);
           await bank.submitChanges();

         })

      if (data.selectBank)
           await bank.selectBank(data.selectBank);

         if (data.Account)
           await bank.enterAccount(data.Account);

         if (data.ConfirmAccount)
           await bank.enterConfirmAccount(data.enterConfirmAccount);

         if(data.AccountType)
         await bank.enterAccountType(data.AccountType);
         await bank.submitChanges();


     }