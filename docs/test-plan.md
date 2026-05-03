# Test Plan — Benefits Dashboard

## 1. Overview

This test plan covers the Benefits Dashboard application that allows employers to add, edit, and delete employees and their dependents, with automatic benefits cost deduction calculations.

## 2. Scope

### In Scope

- Adding employees and dependents
- Editing employee data
- Deleting employees
- Benefits cost calculations
- API endpoints (POST, GET, PUT, DELETE)

### Out of Scope

- Payroll processing
- Authentication system internals
- Third-party integrations

## 3. Business Rules & Calculation Logic

These are the rules all test cases will validate against:

| Rule | Value |
|------|-------|
| Salary per paycheck | $2,000.00 |
| Paychecks per year | 26 |
| Employee benefits cost/year | $1,000.00 |
| Dependent benefits cost/year | $500.00 per dependent |
| Employee benefits cost per paycheck | $1,000 / 26 = $38.46 |
| Dependent benefits cost per paycheck | $500 / 26 = $19.23 per dependent |
