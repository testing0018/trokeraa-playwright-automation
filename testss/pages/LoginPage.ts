import { Page, Locator, expect } from '@playwright/test';
import * as speakeasy from 'speakeasy';

export class LoginPage {
  readonly page: Page;

  private readonly URL = 'http://192.168.3.178:8000/login';
  private readonly TFA_SECRET = 'M4TXOJQI6V5XCHUU';

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly tfaInput: Locator;
  readonly tfaSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.submitButton = page.locator("button[type='submit']");
    this.tfaInput = page.locator("input[name='auth_key']");
    this.tfaSubmitButton = page.locator("button[type='submit']");
  }

  async open() {
    await this.page.context().clearCookies();
    await this.page.goto(this.URL);
    await expect(this.emailInput).toBeVisible();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.submitButton.click();
  }


  async enterValidTfaCode() {
    const otp = speakeasy.totp({
      secret: this.TFA_SECRET,
      encoding: 'base32',
      step: 30,        // must match backend
      digits: 6
    });

    console.log('✅ Generated OTP:', otp);
    await this.tfaInput.fill(otp);
  }


  async clickTfaSubmit() {
    await this.tfaSubmitButton.click();
  }
}
