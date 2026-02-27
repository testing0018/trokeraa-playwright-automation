import { Page, Locator } from '@playwright/test';

export class ConversionCOD {
  readonly page: Page;

  readonly usdtInput: Locator;
  readonly copInput: Locator;
  readonly priceText: Locator;
  readonly inversePriceText: Locator;
  readonly receiveRow: Locator;
  readonly feesRow: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usdtInput = page.locator('input[placeholder="Quantity Given"]');

    // Received COP input (disabled field)
    this.copInput = page.locator('input[disabled]');

    // 1 USDT = xxxx COP
    this.priceText = page.locator('text=/1\\s*USDT\\s*=\\/i');

    // 1 COP = xxxx USDT
    this.inversePriceText = page.locator('#sell_market_inverse_price');

    // Rows
    this.receiveRow = page.locator('text=/You will receive/i').locator('..');
    this.feesRow = page.locator('text=/Fees/i').locator('..');
  }

  async enterUSDT(amount: number) {
    await this.usdtInput.fill('');
    await this.usdtInput.fill(amount.toString());
  }

  // ----------------------------
  // Price : 1 USDT = 3,671.019 COP
  // ----------------------------
  async getPrice(): Promise<number> {
    const text = await this.priceText.textContent();
    const match = text?.match(/=\s*([\d,\.]+)/);
    return Number(match![1].replace(/,/g, ''));
  }

  // ----------------------------
  // Inverse : 1 COP = 0.00027240 USDT
  // ----------------------------
  async getInversePrice(): Promise<number> {
    const text = await this.inversePriceText.textContent();
    const match = text?.match(/=\s*([\d.]+)/);
    return Number(match![1]);
  }

  // ----------------------------
  // You will receive 41,849.62 COP
  // ----------------------------
  async getYouWillReceive(): Promise<number> {
    const text = await this.receiveRow.textContent();
    const match = text?.match(/([\d,\.]+)\s*COP/i);
    return Number(match![1].replace(/,/g, ''));
  }

  // ----------------------------
  // Fees 2,202.61 COP
  // ----------------------------
  async getFees(): Promise<number> {
    const text = await this.feesRow.textContent();
    const match = text?.match(/([\d,\.]+)\s*COP/i);
    return Number(match![1].replace(/,/g, ''));
  }

  // ----------------------------
  // Disabled COP input value
  // ----------------------------
  async getReceivedCOPFromInput(): Promise<number> {
    const value = await this.copInput.inputValue();
    return Number(value.replace(/,/g, ''));
  }
}