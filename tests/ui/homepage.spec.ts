import { test, expect } from '../../helpers/fixtures';

test('TC-002: Home Page UI', async ({ dashboardPage }) => {
  await dashboardPage.page.waitForLoadState('networkidle');

  await test.step('should display the employee table with correct headers', async () => {
    await expect(dashboardPage.employeeTable).toBeVisible();
    const headers = await dashboardPage.getTableHeaderTexts();
    expect(headers).toEqual([
      'Id',
      'Last Name',
      'First Name',
      'Dependents',
      'Salary',
      'Gross Pay',
      'Benefits Cost',
      'Net Pay',
      'Actions',
    ]);
  });

  await test.step('should display the Add Employee button', async () => {
    await expect(dashboardPage.addEmployeeButton).toBeVisible();
  });

  await test.step('should display the Log Out link', async () => {
    await expect(dashboardPage.logoutLink).toBeVisible();
  });

  await test.step('should display at least one employee row', async () => {
    const rowCount = await dashboardPage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  await test.step('should display the Paylocity Benefits Dashboard header', async () => {
    const header = dashboardPage.page.getByRole('link', { name: 'Paylocity Benefits Dashboard' });
    await expect(header).toBeVisible();
  });

  await dashboardPage.page.close();
});
