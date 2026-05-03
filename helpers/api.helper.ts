import { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const API_URL = process.env.API_URL!;
const AUTH_HEADER = process.env.API_AUTH!;

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  dependants: number;
  salary?: number;
  gross?: number;
  benefitsCost?: number;
  net?: number;
}

export class ApiHelper {
  private request: APIRequestContext;
  private headers: Record<string, string>;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.headers = {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json',
    };
  }

  async getAllEmployees() {
    return await this.request.get(API_URL, { headers: this.headers });
  }

  async getEmployeeById(id: string) {
    return await this.request.get(`${API_URL}/${id}`, { headers: this.headers });
  }

  async createEmployee(employee: Partial<Employee>) {
    return await this.request.post(API_URL, {
      headers: this.headers,
      data: employee,
    });
  }

  async updateEmployee(employee: Partial<Employee>) {
    return await this.request.put(API_URL, {
      headers: this.headers,
      data: employee,
    });
  }

  async deleteEmployee(id: string) {
    return await this.request.delete(`${API_URL}/${id}`, { headers: this.headers });
  }
}
