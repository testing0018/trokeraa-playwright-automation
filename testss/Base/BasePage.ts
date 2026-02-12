import { test as base, Browser, BrowserContext, Page } from '@playwright/test';

type TestFixtures = {
  page: Page;
  context: BrowserContext;
};

export const test = base.extend<TestFixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  }
});

export { expect } from '@playwright/test';
