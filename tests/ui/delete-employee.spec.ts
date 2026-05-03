import { test, expect } from '../../helpers/fixtures';
import { ApiHelper } from '../../helpers/api.helper';

test('TC-005: Delete Employee', async ({ dashboardPage, request }) => {
  const api = new ApiHelper(request);

  const createResponse = await api.createEmployee({
    firstName: 'DeleteMe',
    lastName: 'Please',
    dependants: 0,
  });
  const { id: employeeId } = await createResponse.json();

  await dashboardPage.page.reload();
  await dashboardPage.page.waitForLoadState('networkidle');

  await test.step('should delete an employee from the table', async () => {
    const row = await dashboardPage.getEmployeeRowById(employeeId);
    await expect(row).toBeVisible({ timeout: 10000 });
    await dashboardPage.clickDeleteForRow(row);
    await expect(row).toHaveCount(0, { timeout: 10000 });
  });

  await test.step('should decrease table row count after deletion', async () => {
    const deletedRow = dashboardPage.page.locator(`table tbody tr:has(td:text-is("${employeeId}"))`);
    await expect(deletedRow).toHaveCount(0);
  });

  await dashboardPage.page.close();
});
