import { Page, Locator } from '@playwright/test'

export class WhiteListBank {
    readonly page:Page;

    constructor(page:page){
         this.page = page;
        }
    //Helpers

    async click(locator: Locator){
        await locator.waitFor({state: 'visible'});
        await locator.click();
        }
    async type(locator:Locator,value:string){
        await locator.waitFor({state:'visible'});
        await locator.fill(value);
        }
    async selectByValue(locator:Locator, value:string){
        await locator.waitFor({state: 'visible'});
        await locator.selectOption(value);
        }

    //navigation

    async openUSD(){
        await this.click(this.page.locator("(//a[contains(@href, '/USD')])[2]"));
        }
    async openWhitelist(){
        await this.click(this.page.locator("//h6[normalize-space()='Registrar cuenta bancaria para retiros']"));
        }
    async selectBank(){
        await this.selectByValue(this.page.locator("'bank_name'"));
        }
    async enterClabeId(){
        await this.type(this.page.locator("(//input[@id='clabe_id'])[1]"));
        }
    async enterConfirmAccount(){
            await this.type(this.page.locator("//input[@id='confirm_account_number']"));
            }
    async enterAccount(){
                await this.click(this.page.locator("//input[@id='account_number']"));
                    }

    async submitChanges(){
            await this.click(this.page.locator("(//button[@type='submit'])[1]"));

                }
            async submitttChanges(){
                        await this.click(this.page.locator("(//button[@type='submit'])[1]"));

                            }
    async enterAccountType(){
            await this.type(this.page.locator("//input[@id='account_type']");
                            }


    }