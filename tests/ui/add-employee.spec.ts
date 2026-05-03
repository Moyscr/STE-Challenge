import { test, expect } from '../../helpers/fixtures';
import { ApiHelper } from '../../helpers/api.helper';
import {
  COLUMNS,
  ANNUAL_SALARY,
  expectedGrossPay,
  expectedBenefitsCost,
  expectedNetPay,
} from '../../helpers/constants';

test('TC-003: Add Employee', async ({ dashboardPage, request }) => {
  const api = new ApiHelper(request);
  const createdIds: string[] = [];

  await test.step('should add an employee with no dependents', async () => {
    const dependents = 0;
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('Jane', 'Smith', String(dependents));
    await dashboardPage.submitAdd();

    const row = await dashboardPage.getEmployeeRowByName('Jane', 'Smith');
    await expect(row).toBeVisible({ timeout: 10000 });

    const data = await dashboardPage.getRowData(row);
    createdIds.push(data.id!);

    expect(data.salary).toBe(ANNUAL_SALARY.toFixed(2));
    expect(data.grossPay).toBe(expectedGrossPay());
    expect(data.benefitsCost).toBe(expectedBenefitsCost(dependents));
    expect(data.netPay).toBe(expectedNetPay(dependents));
  });

  await test.step('should add an employee with dependents and verify calculations', async () => {
    const dependents = 3;
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('Bob', 'Johnson', String(dependents));
    await dashboardPage.submitAdd();

    const row = await dashboardPage.getEmployeeRowByName('Bob', 'Johnson');
    await expect(row).toBeVisible({ timeout: 10000 });

    const data = await dashboardPage.getRowData(row);
    createdIds.push(data.id!);

    expect(data.salary).toBe(ANNUAL_SALARY.toFixed(2));
    expect(data.grossPay).toBe(expectedGrossPay());
    expect(data.benefitsCost).toBe(expectedBenefitsCost(dependents));
    expect(data.netPay).toBe(expectedNetPay(dependents));
  });

  await test.step('should show employee ID after adding', async () => {
    const dependents = 1;
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('Test', 'IDCheck', String(dependents));
    await dashboardPage.submitAdd();

    const row = await dashboardPage.getEmployeeRowByName('Test', 'IDCheck');
    await expect(row).toBeVisible({ timeout: 10000 });

    const data = await dashboardPage.getRowData(row);
    createdIds.push(data.id!);
    expect(data.id).toBeTruthy();
    expect(data.id!.length).toBeGreaterThan(0);
  });

  // Teardown
  for (const id of createdIds) {
    await api.deleteEmployee(id);
  }
  await dashboardPage.page.close();
});
