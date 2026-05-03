import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/api.helper';

test.describe('API DELETE /employees', () => {
  let api: ApiHelper;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
  });

  test('TC-011: should delete an existing employee', async () => {
    const createResponse = await api.createEmployee({
      firstName: 'DeleteMe',
      lastName: 'Now',
      dependants: 0,
    });
    const created = await createResponse.json();

    const response = await api.deleteEmployee(created.id);
    expect(response.status()).toBe(200);
  });

  test('TC-012: should return error when deleting with invalid ID', async () => {
    const response = await api.deleteEmployee('00000000-0000-0000-0000-000000000000');
    expect(response.status()).toBeGreaterThanOrEqual(404);
  });
});
