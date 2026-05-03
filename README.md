# STE-Challenge

Automated test suite for the **Paylocity Benefits Dashboard** application using Playwright and TypeScript.

## Overview

This project contains end-to-end API and UI tests for the Benefits Dashboard, which allows employers to manage employees and their dependents with automatic benefits cost deduction calculations.

## Tech Stack

- **Playwright** — Test automation framework
- **TypeScript** — Language
- **Node.js / npm** — Runtime and package management
- **Page Object Model** — Design pattern for UI tests

## Project Structure

```
STE-Challenge/
├── tests/
│   ├── api/                  # API test specs
│   │   ├── delete-employees.spec.ts
│   │   ├── get-employees.spec.ts
│   │   ├── post-employees.spec.ts
│   │   └── put-employees.spec.ts
│   └── ui/                   # UI test specs
│       ├── add-employee.spec.ts
│       ├── delete-employee.spec.ts
│       ├── edit-employee.spec.ts
│       ├── form-validation.spec.ts
│       ├── homepage.spec.ts
│       └── login.spec.ts
├── pages/                    # Page Object Models
│   ├── dashboard.page.ts
│   └── login.page.ts
├── helpers/                  # Shared utilities
│   ├── api.helper.ts
│   ├── constants.ts
│   └── fixtures.ts
├── docs/                     # Documentation
│   ├── test-plan.md
│   ├── test-cases.md
│   └── running-tests.md
├── bugs/                     # Bug reports
│   ├── API/
│   ├── UI/
│   ├── screenshots/
│   └── BUG_TEMPLATE.md
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
npm install
npx playwright install chromium
```

### Environment Setup

Create a `.env` file in the project root:

```
USERNAME=<your_username>
PASSWORD=<your_password>
API_AUTH=<Basic auth token>
BASE_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com
API_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees
```

## Running Tests

```bash
# Run all tests
npm test

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run a specific test file
npx playwright test tests/ui/login.spec.ts

# Run in headed mode (see the browser)
npx playwright test --headed

# Run with Playwright UI mode
npx playwright test --ui
```

## Reports

After a test run, open the HTML report:

```bash
npx playwright show-report
```

## Documentation

- [Test Plan](docs/test-plan.md) — Scope, business rules, and calculation logic
- [Test Cases](docs/test-cases.md) — Detailed test case descriptions
- [Running Tests](docs/running-tests.md) — Full setup and execution guide
