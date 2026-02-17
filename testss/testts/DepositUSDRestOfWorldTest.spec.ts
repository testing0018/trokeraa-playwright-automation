import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import DepositUsdForRestOfWorldPage from '../pages/DepositUsdForRestOfWorldPage';


const ComplianceForm = [
  {
    Estimated: '100000',
    SenderBank: 'Kenya',
    isValid: true,
  },
];

for (const data of ComplianceForm) {
  test(`ComplianceForm | ${JSON.stringify(data)}`, async ({ page }) => {
    const login = new LoginPage(page);
    const deposit = new DepositUsdForRestOfWorldPage(page);

    await login.open();
    await login.enterEmail('ajith.vb@hivelance.com');
    await login.enterPassword('Vishwa@123');
    await login.clickSignIn();
    await login.enterValidTfaCode();
    await login.clickTfaSubmit();

    await deposit.openUSDeposit();
    await deposit.EnterEstimatedAmount(data.Estimated);
    await deposit.CountryOfSenderBank(data.SenderBank);
    await deposit.SubmitButton();


    await login.open();
        await login.enterEmail('ajith.vb@hivelance.com');
        await login.enterPassword('Vishwa@123');
        await login.clickSignIn();
        await login.enterValidTfaCode();
        await login.clickTfaSubmit();
  });
}
