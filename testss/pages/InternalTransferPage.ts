import { Page, Locator } from '@playwright/test'
import * as speakeasy from 'speakeasy';

export class InternalTransferPage{
    readonly page: Page;
    private readonly TFA_SECRET = 'M4TXOJQI6V5XCHUU';


      // 🔐 Transaction TFA
      readonly transactionTfaInput: Locator;
      readonly errorMessage: Locator;
      readonly successMessage: Locator;



    constructor (page:Page){
         this.page = page;

         this.TfaInput = page.locator("(//input[@placeholder='Ingresar TFA'])[1]");
         this.successMessage= page.getByText('Hemos enviado un mensaje a tu correo electrónico para confirmar la transferencia interna.',{ exact: false });
         // ✅ Multiple error messages using REGEX
         this.errorMessage = page.getByText(/Please enter amount field|Amount must be greater than 0\.00000001/i,{ exact: false });
        }

    async click(locator: Locator){
        await locator.waitFor({state: 'visible'});
        await locator.click();
         }
     async type(locator: Locator, value: string) {
         await locator.waitFor({state: 'visible'});
         await locator.fill(value);
         }


       async selectByValue(locator: Locator, value: string) {
                await locator.waitFor({state: 'visible'});
                await locator.selectOption(value);
                }

     async openUSDT(){
         await this.click(this.page.locator("//a[contains(@href,'/USDT')]"));
         }
     async enterAmount(value: string){
              await this.type(this.page.locator("//input[@name='int_amount1']"),value);
              }
          async enterEmail(value: string){
                   await this.type(this.page.locator("//input[@id='email']"),value);
                   }
               async enterNotes(value: string){
                        await this.type(this.page.locator("//input[@id='notes']"),value);
                        }
               async selectCurrency( currencyValue: string){
                       await this.selectByValue(this.page.locator("//select[@id='int_currency']"),currencyValue);
                   }
               async submitChanges(){
                   await this.click(this.page.locator("//button[@id='hide_btnnn']"));
                   }
               async enterTransactionTfaCode() {
                 const otp = speakeasy.totp({
                   secret: this.TFA_SECRET,
                   encoding: 'base32',
                   step: 30,
                   digits: 6,
                 });

                 console.log('✅ Transaction OTP:', otp);
                 await this.TfaInput.fill(otp);
               }

           async openInternalTransfer(){
              await this.click(this.page.locator("//h6[normalize-space()='Transferencia interna']"));
                  }
    }