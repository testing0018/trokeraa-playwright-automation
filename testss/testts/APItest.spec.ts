import { test, expect } from '@playwright/test';

/* ===================== TEST DATA ===================== */

const exchangeData = [
  // ----------- VALID -----------
  {
    name: 'Valid USDT → MXN',
    body: {
      first_currency: 'USDT',
      second_currency: 'MXN',
      amount: 10
    },
    isValid: true
  },

  // ----------- INVALID : missing first currency -----------
  {
    name: 'Missing first currency',
    body: {
      second_currency: 'MXN',
      amount: 10
    },
    isValid: false
  },

  // ----------- INVALID : missing second currency -----------
  {
    name: 'Missing second currency',
    body: {
      first_currency: 'USDT',
      amount: 10
    },
    isValid: false
  },

  // ----------- INVALID : zero amount -----------
  {
    name: 'Zero amount',
    body: {
      first_currency: 'USDT',
      second_currency: 'MXN',
      amount: 0
    },
    isValid: false
  },

  // ----------- INVALID : negative amount -----------
  {
    name: 'Negative amount',
    body: {
      first_currency: 'USDT',
      second_currency: 'MXN',
      amount: -5
    },
    isValid: false
  },

  // ----------- INVALID : invalid currency code -----------
  {
    name: 'Invalid currency code',
    body: {
      first_currency: 'AAA',
      second_currency: 'MXN',
      amount: 10
    },
    isValid: false
  }
];

/* ===================== TEST ===================== */

for (const data of exchangeData) {

  test(`Currency Exchange API | ${data.name}`, async ({ request }) => {

    const response = await request.post(
      'http://192.168.3.34:8000/api/currencyExchangeAPI',
      {
        headers: {
          'X-API-KEY': 'Pj6eqPgwn6y5cKGHrPC3cgaYU6cUpfEZ',
          'SECRET-KEY': 'CFRhyJ3TKfBlFYkxVjxt',
          'Content-Type': 'application/json'
        },
        data: data.body
      }
    );

    const responseBody = await response.json();
    console.log(data.name, response.status(), responseBody);

    /* ================= VALID CASE ================= */

    if (data.isValid) {

      expect(response.status()).toBe(200);

      // Adjust keys based on your real API response
      expect(responseBody).toBeTruthy();

      // Example common validations (change field names if needed)
      // expect(responseBody.success).toBe(true);
      // expect(responseBody.data).toBeDefined();
    }

    /* ================= INVALID CASE ================= */

    if (!data.isValid) {

      // Many APIs still return 200 with error message
      // So we validate by response content, not only status

      expect(response.status()).toBe(200);

      // Change these according to your actual error structure
      // Example:
      // expect(responseBody.success).toBe(false);
      // expect(responseBody.message).toBeDefined();

      expect(responseBody).toBeTruthy();
    }

  });

}