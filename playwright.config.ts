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
  reporter:  [['html', { open: 'never' }]],

  /* Shared settings */
  use: {
    headless: false,                 // ✅ OPEN BROWSER UI
    actionTimeout: 90_000,
    navigationTimeout: 60_000,

     screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

    launchOptions: {
      slowMo: 500,                   // ✅ SEE ACTIONS CLEARLY

        // ✅ SCREENSHOT
           screenshot: 'only-on-failure',

        // ✅ VIDEO
           video: 'retain-on-failure',

        // ✅ TRACE
           trace: 'retain-on-failure',

  },
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
      //  ...devices['Pixel 5'],  // Android device emulation
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
