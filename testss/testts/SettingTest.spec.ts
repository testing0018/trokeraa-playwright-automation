import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';


/* ================= CHANGE PASSWORD DATA ================= */

const changePasswordData = [
  {
    currentPwd: '',
    newPwd: 'NewPass@123',
    confirmPwd: 'NewPass@123',
    isValid: false,
  },
    {
    currentPwd: 'Xing@123',
    newPwd: 'NewPass@123',
    confirmPwd: 'Mismatch@123',
   isValid: false,
  },
 {
    currentPwd: 'wrongpwd',
    newPwd: 'NewPass@123',
  confirmPwd: 'NewPass@123',
    isValid: false,
 },
  {
  currentPwd: 'Zing@123',
   newPwd: 'Xing123',
    confirmPwd: 'Xing123',
    isValid: true,
  },
];

/* ================= TEST ================= */

for (const data of changePasswordData) {
  test(`Change Password | ${JSON.stringify(data)}`, async ({ page, browser }) => {

    const login = new LoginPage(page);
    const settings = new SettingsPage(page);

    /* ========== LOGIN (BEFORE TEST) ========== */
    await login.open();
    await login.enterEmail('ajith.vb@hivelance.com');
    await login.enterPassword('Vishwa@123');
    await login.clickSignIn();
    await login.enterValidTfaCode();
    await login.clickTfaSubmit();


    /* ========== CHANGE PASSWORD ========== */

    await settings.openSettings();
    await settings.openSecurity();
    await settings.openChangePassword();


    if (data.currentPwd)
      await settings.enterCurrentPassword(data.currentPwd);

    if (data.newPwd)
      await settings.enterNewPassword(data.newPwd);

    if (data.confirmPwd)
      await settings.enterConfirmPassword(data.confirmPwd);

    await settings.submitChangePassword();

    /* ================= INVALID ASSERTIONS ================= */

    if (!data.isValid) {
      // Case 1: Empty current password
      if (!data.currentPwd) {
        expect(await settings.isCurrentPasswordRequired()).toBeTruthy();
      }

      // Case 2: Password mismatch
      else if (data.newPwd !== data.confirmPwd) {
        expect(
          await settings.isPasswordMismatchError()
        ).toBeTruthy();
      }

      // Case 3: Wrong current password
      else {
        expect(
          await settings.isGivenPasswordIncorrectError()
        ).toBeTruthy();
      }
    }

    /* ================= VALID FLOW ================= */

    if (data.isValid) {
      expect(
        await settings.isPasswordChangeSuccess()
      ).toBeTruthy();

      /* ========== LOGIN WITH NEW PASSWORD (SHOULD PASS) ========== */

      const newContext = await browser.newContext();
      const newPage = await newContext.newPage();
      const newLogin = new LoginPage(newPage);

      await newLogin.open();
      await newLogin.enterEmail('ajith.vb@hivelance.com');
      await newLogin.enterPassword(data.newPwd);
      await newLogin.clickSignIn();
      await newLogin.enterValidTfaCode();
      await newLogin.clickTfaSubmit();

      await expect(newPage).toHaveURL(/dashboard/);

     await newContext.close();

      /* ========== LOGIN WITH OLD PASSWORD (SHOULD FAIL) ========== */

      const oldContext = await browser.newContext();
      const oldPage = await oldContext.newPage();
      const oldLogin = new LoginPage(oldPage);

      await oldLogin.open();
      await oldLogin.enterEmail('ajith.vb@hivelance.com');
      await oldLogin.enterPassword(data.currentPwd);
      await oldLogin.clickSignIn();

      // Expect login failure (URL should NOT change to dashboard)
    //  await expect(oldPage).not.toHaveURL(/dashboard/);

      //await oldContext.close();
    }
  });
}
