import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/api.helper';

test.describe('API POST /employees', () => {
  let api: ApiHelper;
  let createdId: string;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
  });

  test.afterEach(async () => {
    if (createdId) {
      await api.deleteEmployee(createdId);
      createdId = '';
    }
  });

  test('TC-007: should create a valid employee', async () => {
    const response = await api.createEmployee({
      firstName: 'ApiTest',
      lastName: 'PostValid',
      dependants: 2,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    createdId = body.id;

    expect(body.id).toBeTruthy();
    expect(body.firstName).toBe('ApiTest');
    expect(body.lastName).toBe('PostValid');
    expect(body.dependants).toBe(2);
    expect(body.salary).toBe(52000);
    expect(body.gross).toBe(2000);
    expect(body.benefitsCost).toBeCloseTo(76.92, 1);
    expect(body.net).toBeCloseTo(1923.08, 1);
  });

  test('TC-008: should return error when missing firstName', async () => {
    const response = await api.createEmployee({
      lastName: 'NoFirst',
      dependants: 0,
    });

    expect(response.status()).toBe(400);
  });

  test('TC-008: should return error when missing lastName', async () => {
    const response = await api.createEmployee({
      firstName: 'NoLast',
      dependants: 0,
    });

    expect(response.status()).toBe(400);
  });
});
