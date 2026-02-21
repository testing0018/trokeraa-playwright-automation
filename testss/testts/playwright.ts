import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Launching browser...');

  // 1️⃣ Launch browser
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
  });

  // 2️⃣ Create browser context (like a new incognito window)
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  // 3️⃣ Open a new page (tab)
  const page = await context.newPage();

  // 4️⃣ Control the page
  console.log('🌐 Opening website...');
  await page.goto('https://example.com');

  // 5️⃣ Interact with page
  const heading = page.locator('h1');
  console.log('📌 Page heading:', await heading.textContent());

  // 6️⃣ Take screenshot
  await page.screenshot({ path: 'example.png' });
  console.log('📸 Screenshot saved');

  // 7️⃣ Open another page in same context
  const page2 = await context.newPage();
  await page2.goto('https://playwright.dev');
  console.log('🌍 Second page opened');

  // 8️⃣ Close everything
  await page2.close();
  await page.close();
  await context.close();
  await browser.close();

  console.log('✅ Browser closed successfully');
})();