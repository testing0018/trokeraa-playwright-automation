import { test, expect } from '@playwright/test';
import { LoginPage  }   from  '../pages/LoginPage';
import { InternalTransferPage } from '../pages/InternalTransferPage';

const InternalTransferData = [
   // ✅ FULLY VALID
     {
       scenario: 'Valid transfer - all fields valid',
       amount: '2',
       currency: '_USDT',
       email: 'vishwa.t@hivelance.com',
       note: 'Valid transfer',
       isValid: true,
     },

     // ❌ AMOUNT VALIDATIONS
     {
       scenario: 'Invalid - empty amount',
       amount: '',
       currency: '_USDT',
       email: 'vishwa.t@hivelance.com',
       note: 'Empty amount',
       isValid: false,
     },
     {
       scenario: 'Invalid - zero amount',
      amount: '0',
       currency: '_USDT',
      email: 'testingqa0013@gmail.com',
       note: 'Zero amount',
     isValid: false,
     },


     {
       scenario: 'Invalid - currency not selected',
      amount: '1',
       currency: '',
       email: 'testingqa0013@gmail.com',
       note: 'No currency',
      isValid: false,
     },

     // ❌ EMAIL VALIDATIONS
     //{
       //scenario: 'Invalid - empty email',
       //amount: '1',
      // currency: '_USDT',
      // email: '',
      // note: 'Empty email',
      // isValid: false,
     //},
     //{
      // scenario: 'Invalid - invalid email format',
      // amount: '1',
       //currency: '_USDT',
       //email: 'invalid-email',
      // note: 'Invalid email',
      // isValid: false,
     //},

     // ❌ NOTE VALIDATION
     //{
      // scenario: 'Invalid - empty note',
       //amount: '1',
      // currency: '_USDT',
     //  email: 'testingqa0013@gmail.com',
      // note: '',
      // isValid: false,
    // },
    ]
for(const data of InternalTransferData){
    test(`InternalTransfer| ${data.scenario}`, async ({page})=>{

        const login = new LoginPage(page);
        const transfer = new InternalTransferPage(page);

        // before test
           await login.open();
           await login.enterEmail('ajith.vb@hivelance.com');
           await login.enterPassword('Vishwa@123');
           await login.clickSignIn();
           await login.enterValidTfaCode();
           await login.clickTfaSubmit();
        // internal transfer

           await transfer.openUSDT();
           await transfer.openInternalTransfer();

             if (data.amount) {
                  await transfer.enterAmount(data.amount);
                }

                if (data.currency) {
                  await transfer.selectCurrency(data.currency);
                }

                if (data.email) {
                  await transfer.enterEmail(data.email);
                }

                if (data.note) {
                  await transfer.enterNotes(data.note);
                }
           await transfer.enterTransactionTfaCode();
           await transfer.submitChanges();

               /* ===== ASSERTIONS ===== */
                 if (data.isValid) {
                   await transfer.enterTransactionTfaCode();
                   await transfer.submitChanges();

                   await expect.soft(transfer.successMessage).toBeVisible();
                 } else {
                   await expect.soft(transfer.errorMessage).toBeVisible();

                 }

        });
    }