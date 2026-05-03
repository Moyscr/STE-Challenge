import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/api.helper';

test.describe('API GET /employees', () => {
  let api: ApiHelper;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
  });

  test('TC-013: should get all employees', async () => {
    const response = await api.getAllEmployees();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    const employee = body[0];
    expect(employee).toHaveProperty('id');
    expect(employee).toHaveProperty('firstName');
    expect(employee).toHaveProperty('lastName');
    expect(employee).toHaveProperty('dependants');
    expect(employee).toHaveProperty('salary');
    expect(employee).toHaveProperty('gross');
    expect(employee).toHaveProperty('benefitsCost');
    expect(employee).toHaveProperty('net');
  });

  test('TC-014: should get a single employee by ID', async () => {
    const createResponse = await api.createEmployee({
      firstName: 'GetById',
      lastName: 'Test',
      dependants: 2,
    });
    const created = await createResponse.json();

    const response = await api.getEmployeeById(created.id);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(created.id);
    expect(body.firstName).toBe('GetById');
    expect(body.lastName).toBe('Test');
    expect(body.dependants).toBe(2);

    await api.deleteEmployee(created.id);
  });

  test('TC-015: should return not found for a deleted employee', async () => {
    const createResponse = await api.createEmployee({
      firstName: 'GetDeleted',
      lastName: 'Ghost',
      dependants: 0,
    });
    const created = await createResponse.json();
    await api.deleteEmployee(created.id);

    const response = await api.getEmployeeById(created.id);
    // BUG: API returns 200 with empty body for deleted employees instead of 404
    expect(response.status()).toBe(404);
  });
});
