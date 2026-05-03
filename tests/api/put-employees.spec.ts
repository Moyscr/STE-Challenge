import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/api.helper';

test.describe('API PUT /employees', () => {
  let api: ApiHelper;
  let employeeId: string;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
    const response = await api.createEmployee({
      firstName: 'PutTest',
      lastName: 'Original',
      dependants: 1,
    });
    const body = await response.json();
    employeeId = body.id;
  });

  test.afterEach(async () => {
    if (employeeId) {
      await api.deleteEmployee(employeeId);
    }
  });

  test('TC-009: should update an existing employee', async () => {
    const response = await api.updateEmployee({
      id: employeeId,
      firstName: 'PutTest',
      lastName: 'Updated',
      dependants: 3,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.id).toBe(employeeId);
    expect(body.lastName).toBe('Updated');
    expect(body.dependants).toBe(3);
    // Benefits cost = (1000 + 3*500) / 26 = 96.15
    expect(body.benefitsCost).toBeCloseTo(96.15, 1);
    expect(body.net).toBeCloseTo(1903.85, 1);
  });

  test('TC-010: should return error when updating with invalid ID', async () => {
    const response = await api.updateEmployee({
      id: '00000000-0000-0000-0000-000000000000',
      firstName: 'Ghost',
      lastName: 'Employee',
      dependants: 0,
    });

    expect(response.status()).toBeGreaterThanOrEqual(404);
  });
});
