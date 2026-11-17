import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test('@smoke invalid login shows error', async ({ page }) => {
  const login = new LoginPage(page); await login.goto();
  await login.login('invalid_user', 'invalid_password');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
test('@intentional-failure verifies CI failure propagation', async ({ page }) => {
  test.skip(process.env.RUN_FAILURE_TEST !== 'true', 'Enable only for explicit pipeline failure validation');
  await page.goto('/');
  await expect(page.locator('[data-test="nonexistent-validation-element"]')).toBeVisible({timeout: 2000});
});