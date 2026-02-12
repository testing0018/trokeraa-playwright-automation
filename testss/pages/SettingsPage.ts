import { Page, Locator } from '@playwright/test';

export default class SettingsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ================= HELPERS ================= */

  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async type(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /* ================= NAVIGATION ================= */

  async openSettings() {
    await this.click(this.page.locator("//a[p[normalize-space()='Ajustes']]"));
  }

  async openPersonal() {
    await this.click(this.page.locator("//a[contains(@href,'/personal')]") );
  }

  async openSecurity() {
    await this.click(this.page.locator("//a[contains(@href,'/security')]") );
  }

  async openOverview() {
    await this.click(this.page.locator("//a[.//p[normalize-space()='Resumen']]") );
  }

  /* ================= PERSONAL ================= */

  async selectBtcDenomination(value: string) {
    await this.page.locator('#btc_denomination').selectOption(value);
  }

  async uploadAvatar(imagePath: string) {
    await this.page .locator("input[type='file']").setInputFiles(imagePath);
  }

  async enterCompanyName(company: string) {
    await this.type(this.page.locator("input[name='company_name']"),company);
  }

  async saveChanges() {
    const saveBtn = this.page.locator("input[value='Save changes']");
    await saveBtn.scrollIntoViewIfNeeded();
    await this.tap(saveBtn);
  }

  /* ================= SECURITY ================= */

  async openChangePassword() {
    await this.click(
      this.page.locator("//a[contains(@href,'change_password')]")
    );
  }

  async enterCurrentPassword(password: string) {
    await this.type(this.page.locator("input[name='current_password']"),password);
  }

  async enterNewPassword(password: string) {
    await this.type(
      this.page.locator("input[name='new_password']"), password);
  }

  async enterConfirmPassword(password: string) {
    await this.type(this.page.locator("input[name='repeat_password']"),password);
  }

  async submitChangePassword() {
    await this.click(this.page.locator("button:has-text('Enviar')") );
  }

  /* ================= VALIDATIONS ================= */

  async isPasswordChangeSuccess(): Promise<boolean> {
    return await this.page
      .locator("div.alert-success")
      .isVisible();
  }

  async isPasswordMismatchError(): Promise<boolean> {
    return await this.page
      .locator("#repeat_password-error")
      .isVisible();
  }

    async  isCurrentPasswordRequired(): Promise<boolean> {
      return await this.page
        .locator("current_password-error")
        .isVisible();
    }


  async isGivenPasswordIncorrectError(): Promise<boolean> {
    return await this.page
      .locator("current_password-error")
      .isVisible();
  }


}
