import { Page, Locator } from '@playwright/test';

export default class DepositUsdForRestOfWorldPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async type(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async image(locator: Locator, image: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.setInputFiles(image);
  }

  async openUSDeposit() {
    await this.click(
      this.page.locator(
        "//div[@id='sidebar-wrapper']//p[normalize-space()='Depósito Bancario USD']/ancestor::a"
      )
    );
  }

  async EnterEstimatedAmount(Estimated: string) {
    await this.type(
      this.page.locator("//input[@placeholder='Estimated amount' or @name='estimated_amount']"),
      Estimated
    );
  }

  async CountryOfSenderBank(SenderBank: string) {
    await this.type(
      this.page.locator("//input[@placeholder='Country of sender bank' or @name='sender_bank']"),
      SenderBank
    );
  }

  async SubmitButton() {
    await this.click(this.page.locator("//button[normalize-space()='ENVIAR']"));
  }
}
