import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import WhiteListBank from '../pages/WhiteListBank';

// whitelistBank

const WhiteListBankData = [

    {
      selectBank: 'BANJERCITO',
      ClabeId   : '900089'
      Account   : '88889'
      ConfirmAccount : '88889',
        }

    ]

 for ( const data of WhiteListBank){
     test(`whitelistBank | ${JSON.stringify(data)}`,async({ page, browser }) =>{
         const login = new LoginPage(page);
         const Bank  = new WhiteListBank(page);

         //login before test
       await login.open();
       await login.enterEmail('ajith.vb@hivelance.com');
       await login.enterPassword('Vishwa@123');
       await login.clickSignIn();
       await login.enterValidTfaCode();
       await login.clickTfaSubmit();

       // WhiteListBank
       await Bank.openUSD();
       await Bank.openWhiteList();
       await Bank.submitChanges();


         }

     }