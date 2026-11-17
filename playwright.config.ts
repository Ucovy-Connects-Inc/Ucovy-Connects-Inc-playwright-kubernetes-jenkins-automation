import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 30000, retries: process.env.CI ? 1 : 0,
  use: { baseURL: process.env.BASE_URL || 'https://www.saucedemo.com', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  reporter: [['list'], ['junit', { outputFile: 'test-results/junit.xml' }], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});