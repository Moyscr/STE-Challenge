import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('TC-001: Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await test.step('should display login page elements', async () => {
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  await test.step('should not login with empty fields', async () => {
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/.*Login|.*LogIn/);
  });

  await test.step('should not login with invalid credentials', async () => {
    await loginPage.login('invalidUser', 'invalidPass');
    await expect(page).not.toHaveURL(/.*Benefits/);
  });

  await test.step('should login with valid credentials', async () => {
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/.*Benefits/);
    await expect(page).toHaveTitle('Employees - Paylocity Benefits Dashboard');
  });

  await page.close();
});
