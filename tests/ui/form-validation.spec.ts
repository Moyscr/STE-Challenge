import { test, expect } from '../../helpers/fixtures';
import { ApiHelper } from '../../helpers/api.helper';

test('TC-006: Form Fields Validation', async ({ dashboardPage, request }) => {
  const api = new ApiHelper(request);

  await dashboardPage.clickAddEmployee();

  await test.step('should display all form fields in Add modal', async () => {
    await expect(dashboardPage.firstNameInput).toBeVisible();
    await expect(dashboardPage.lastNameInput).toBeVisible();
    await expect(dashboardPage.dependentsInput).toBeVisible();
    await expect(dashboardPage.addButton).toBeVisible();
    await expect(dashboardPage.cancelButton).toBeVisible();
  });

  await test.step('should close modal on Cancel click', async () => {
    await dashboardPage.cancelButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await test.step('should close modal on Close (X) button click', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.closeButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await test.step('should not submit with empty first name', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('', 'TestLast', '0');
    await dashboardPage.addButton.click();

    const modalVisible = await dashboardPage.modal.isVisible();
    if (!modalVisible) {
      const response = await api.getAllEmployees();
      const employees = await response.json();
      const badEmployee = employees.find((e: any) => e.lastName === 'TestLast' && !e.firstName);
      if (badEmployee) await api.deleteEmployee(badEmployee.id);
    }
    expect(modalVisible).toBe(true);
    await dashboardPage.cancelButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await test.step('should not submit with empty last name', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('TestFirst', '', '0');
    await dashboardPage.addButton.click();

    const modalVisible = await dashboardPage.modal.isVisible();
    if (!modalVisible) {
      const response = await api.getAllEmployees();
      const employees = await response.json();
      const badEmployee = employees.find((e: any) => e.firstName === 'TestFirst' && !e.lastName);
      if (badEmployee) await api.deleteEmployee(badEmployee.id);
    }
    expect(modalVisible).toBe(true);
    await dashboardPage.cancelButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await test.step('should not accept negative dependents', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('TestFirst', 'TestLast', '-1');
    await dashboardPage.addButton.click();

    const modalVisible = await dashboardPage.modal.isVisible();
    if (!modalVisible) {
      const response = await api.getAllEmployees();
      const employees = await response.json();
      const badEmployee = employees.find((e: any) => e.firstName === 'TestFirst' && e.lastName === 'TestLast');
      if (badEmployee) await api.deleteEmployee(badEmployee.id);
    }
    expect(modalVisible).toBe(true);
    await dashboardPage.cancelButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await test.step('should not accept non-numeric dependents', async () => {
    await dashboardPage.clickAddEmployee();
    await dashboardPage.fillEmployeeForm('TestFirst', 'TestLast', 'abc');
    await dashboardPage.addButton.click();

    const modalVisible = await dashboardPage.modal.isVisible();
    if (!modalVisible) {
      const response = await api.getAllEmployees();
      const employees = await response.json();
      const badEmployee = employees.find((e: any) => e.firstName === 'TestFirst' && e.lastName === 'TestLast');
      if (badEmployee) await api.deleteEmployee(badEmployee.id);
    }
    expect(modalVisible).toBe(true);
    await dashboardPage.cancelButton.click();
    await expect(dashboardPage.modal).toBeHidden();
  });

  await dashboardPage.page.close();
});
