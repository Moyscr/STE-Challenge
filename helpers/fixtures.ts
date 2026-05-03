import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

type Fixtures = {
  authenticatedPage: Page;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await page.waitForURL('**/Benefits');
    await use(page);
  },
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboard = new DashboardPage(authenticatedPage);
    await use(dashboard);
  },
});

export { expect } from '@playwright/test';
