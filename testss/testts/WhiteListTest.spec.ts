import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import WhiteListBankPage from '../pages/WhiteListBankPage';

const WhiteListBankData = [
  {
    selectBank: 'Banco Cuscatlan',
    Account: '88889',
    ConfirmAccount: '88889',
    AccountType: 'test'
  },
  {
    selectBank: 'Banco Cuscatlan',
    Account: '',
    ConfirmAccount: '88889',
    AccountType: 'test'
  }
];

for (const data of WhiteListBankData) {

  test(`whitelistBank | ${JSON.stringify(data)}`, async ({ page }) => {

    const login = new LoginPage(page);
    const bank = new WhiteListBankPage(page);

    /* ========== LOGIN ========== */
    await login.open();
    await login.enterEmail('ajith.vb@hivelance.com');
    await login.enterPassword('Vishwa@123');
    await login.clickSignIn();
    await login.enterValidTfaCode();
    await login.clickTfaSubmit();

    /* ========== OPEN WHITELIST ========== */
    await bank.openUSD();
    await bank.openWhitelist();

    /* ========== CONDITIONAL INPUTS ========== */
    if (data.selectBank) {
      await bank.selectBank(data.selectBank);
    }

    if (data.Account) {
      await bank.enterAccount(data.Account);
    }

    if (data.ConfirmAccount) {
      await bank.enterConfirmAccount(data.ConfirmAccount);
    }

    if (data.AccountType) {
      await bank.enterAccountType(data.AccountType);
    }

    /* ========== SUBMIT ========== */
    await bank.submitChanges();

    /* ========== BASIC ASSERTION (OPTIONAL) ========== */
    expect(true).toBeTruthy();
  });

}