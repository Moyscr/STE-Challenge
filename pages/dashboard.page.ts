import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly addEmployeeButton: Locator;
  readonly employeeTable: Locator;
  readonly tableRows: Locator;
  readonly tableHeaders: Locator;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dependentsInput: Locator;
  readonly addButton: Locator;
  readonly updateButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.getByRole('button', { name: 'Add Employee' });
    this.employeeTable = page.getByRole('table');
    this.tableRows = page.locator('table tbody tr');
    this.tableHeaders = page.locator('table thead th');
    this.modal = page.getByRole('dialog');
    this.modalTitle = page.getByRole('heading', { level: 5 });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name:' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name:' });
    this.dependentsInput = page.getByRole('textbox', { name: 'Dependents:' });
    this.addButton = page.getByRole('button', { name: 'Add', exact: true });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async goto() {
    await this.page.goto('/Prod/Benefits');
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
    await this.modal.waitFor({ state: 'visible' });
  }

  async fillEmployeeForm(firstName: string, lastName: string, dependents: string) {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
    await this.dependentsInput.clear();
    await this.dependentsInput.fill(dependents);
  }

  async submitAdd() {
    await this.addButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async submitUpdate() {
    await this.updateButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async clickEditForRow(row: Locator) {
    const actionsCell = row.locator('td').last();
    await actionsCell.locator('i').first().click();
    await this.modal.waitFor({ state: 'visible' });
  }

  async clickDeleteForRow(row: Locator) {
    const actionsCell = row.locator('td').last();
    await actionsCell.locator('i.fa-times').click();
    await this.modal.waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async getEmployeeRowById(id: string): Promise<Locator> {
    const row = this.page.locator(`table tbody tr:has(td:text-is("${id}"))`);
    await row.waitFor({ state: 'visible', timeout: 15000 });
    return row;
  }

  async getEmployeeRowByName(firstName: string, lastName: string): Promise<Locator> {
    await this.tableRows.first().waitFor({ state: 'visible', timeout: 10000 });
    return this.page.locator(`table tbody tr:has(td:text-is("${firstName}")):has(td:text-is("${lastName}"))`);
  }

  async getRowCount(): Promise<number> {
    await this.tableRows.first().waitFor({ state: 'visible', timeout: 10000 });
    return await this.tableRows.count();
  }

  async getTableHeaderTexts(): Promise<string[]> {
    return await this.tableHeaders.allTextContents();
  }

  async getRowData(row: Locator) {
    const cells = row.locator('td');
    return {
      id: await cells.nth(0).textContent(),
      firstName: await cells.nth(1).textContent(),
      lastName: await cells.nth(2).textContent(),
      dependents: await cells.nth(3).textContent(),
      salary: await cells.nth(4).textContent(),
      grossPay: await cells.nth(5).textContent(),
      benefitsCost: await cells.nth(6).textContent(),
      netPay: await cells.nth(7).textContent(),
    };
  }
}
