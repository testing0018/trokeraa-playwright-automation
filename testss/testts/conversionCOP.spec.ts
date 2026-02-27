import { test, expect } from '@playwright/test';
import { ConversionCODPage } from '../pages/ConversionCODPage';
import { LoginPage } from '../pages/LoginPage';

test(
  '@regression USDT → COP Conversion | Keyboard Input Scenario',
  async ({ page }) => {

    const login = new LoginPage(page);
    const conversion = new ConversionCODPage(page);

    /* ========== LOGIN ========== */
    await login.open();
    await login.enterEmail('ajith.vb@hivelance.com');
    await login.enterPassword('Vishwa@123');
    await login.clickSignIn();
    await login.enterValidTfaCode();
    await login.clickTfaSubmit();

    /* ========== OPEN CONVERSION PAGE ========== */
    await conversion.openCop();
    await conversion.openConversion();

    /* ========== KEYBOARD INPUT (🔥 FIX) ========== */
    await conversion.enterUSDTWithKeyboard(1);
    await conversion.clickPreview();

    /* ========== WAIT FOR REAL VALUE ========== */
    await conversion.waitForReceiveValueToChange();

    /* ========== ASSERTIONS ========== */
    const price = await conversion.getPrice();
    const receivedUI = await conversion.getYouWillReceive();
    const feesUI = await conversion.getFees();

    const grossCOP = 13 * price;
    const expectedFees = Number((grossCOP * 0.02).toFixed(2));
    const expectedNet = Number((grossCOP - expectedFees).toFixed(2));

    expect.soft(feesUI).toBeCloseTo(expectedFees, 2);
    expect.soft(receivedUI).toBeCloseTo(expectedNet, 2);
  }
);