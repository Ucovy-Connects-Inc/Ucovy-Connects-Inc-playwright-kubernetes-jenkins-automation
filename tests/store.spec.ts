import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(process.env.DEMO_USERNAME || 'standard_user', process.env.DEMO_PASSWORD || 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);
});
test('@smoke inventory page displays products', async ({ page }) => {
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});
test('@smoke add item to cart', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(1);
});
test('@smoke checkout workflow', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Demo');
  await page.locator('[data-test="lastName"]').fill('Tester');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});