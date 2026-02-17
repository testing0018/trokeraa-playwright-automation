import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './testss',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry only on CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* HTML report */
  reporter: 'html',

  /* Shared settings */
  use: {
    headless: false,                 // ✅ OPEN BROWSER UI
    actionTimeout: 90_000,
    navigationTimeout: 60_000,

    launchOptions: {
      slowMo: 500,                   // ✅ SEE ACTIONS CLEARLY
    },

    trace: 'on-first-retry',
  },

  /* Projects */
  projects: [
    /* ===== DESKTOP ===== */
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },

    //* ===== ANDROID ===== */
   // {
    //  name: 'Android Chrome',
     // use: {
      //  ...devices['Pixel 5'],       // Android device emulation
     //   headless: false,
      //},
   // },

    ///* ===== iOS ===== */
    //{
     // name: 'iOS Safari',
     // use: {
        //...devices['iPhone 13'],     // iOS device emulation
       // headless: false,
      //},
   // },
  ],
});
