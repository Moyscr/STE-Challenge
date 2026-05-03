import { test, expect } from '../../helpers/fixtures';
import { ApiHelper } from '../../helpers/api.helper';
import { COLUMNS, expectedBenefitsCost, expectedNetPay } from '../../helpers/constants';

test('TC-004: Edit Employee', async ({ dashboardPage, request }) => {
  const api = new ApiHelper(request);

  const createResponse = await api.createEmployee({
    firstName: 'EditFirst',
    lastName: 'EditLast',
    dependants: 1,
  });
  const { id: employeeId } = await createResponse.json();

  await dashboardPage.page.reload();
  await dashboardPage.page.waitForLoadState('networkidle');

  await test.step('should edit employee first name', async () => {
    const row = await dashboardPage.getEmployeeRowById(employeeId);
    await dashboardPage.clickEditForRow(row);
    await dashboardPage.fillEmployeeForm('UpdatedFirst', 'EditLast', '1');
    await dashboardPage.submitUpdate();

    await expect(row.locator('td').nth(COLUMNS.FIRST_NAME)).toHaveText('UpdatedFirst', { timeout: 10000 });
  });

  await test.step('should edit employee last name', async () => {
    const row = await dashboardPage.getEmployeeRowById(employeeId);
    await dashboardPage.clickEditForRow(row);
    await dashboardPage.fillEmployeeForm('UpdatedFirst', 'UpdatedLast', '1');
    await dashboardPage.submitUpdate();

    await expect(row.locator('td').nth(COLUMNS.LAST_NAME)).toHaveText('UpdatedLast', { timeout: 10000 });
  });

  await test.step('should edit dependents and recalculate benefits', async () => {
    const updatedDependents = 5;
    const row = await dashboardPage.getEmployeeRowById(employeeId);
    await dashboardPage.clickEditForRow(row);
    await dashboardPage.fillEmployeeForm('UpdatedFirst', 'UpdatedLast', String(updatedDependents));
    await dashboardPage.submitUpdate();

    await expect(row.locator('td').nth(COLUMNS.DEPENDENTS)).toHaveText(String(updatedDependents), { timeout: 10000 });
    await expect(row.locator('td').nth(COLUMNS.BENEFITS_COST)).toHaveText(expectedBenefitsCost(updatedDependents));
    await expect(row.locator('td').nth(COLUMNS.NET_PAY)).toHaveText(expectedNetPay(updatedDependents));
  });

  await api.deleteEmployee(employeeId);
  await dashboardPage.page.close();
});
