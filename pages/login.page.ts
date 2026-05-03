import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly logo: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('.text-danger, .validation-summary-errors, .alert-danger');
    this.logo = page.getByRole('img', { name: 'Paylocity' });
    this.title = page.getByRole('link', { name: 'Paylocity Benefits Dashboard' });
  }

  async goto() {
    await this.page.goto('/Prod/Account/Login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
