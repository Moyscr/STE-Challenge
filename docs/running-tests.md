# Running the Tests

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (included with Node.js)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install Playwright browsers**

   ```bash
   npx playwright install chromium
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root with the following values:

   ```
   USERNAME=<your_username>
   PASSWORD=<your_password>
   API_AUTH=<Basic auth token>
   BASE_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com
   API_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees
   ```

## Running Tests

### Run all tests

```bash
npm test
```

or

```bash
npx playwright test
```

### Run only UI tests

```bash
npx playwright test tests/ui/
```

### Run only API tests

```bash
npx playwright test tests/api/
```

### Run a specific test file

```bash
npx playwright test tests/ui/login.spec.ts
```

### Run tests in headed mode (see the browser)

```bash
npx playwright test --headed
```

### Run tests with Playwright UI mode

```bash
npx playwright test --ui
```

## Viewing Reports

After a test run, an HTML report is generated. Open it with:

```bash
npx playwright show-report
```

## Project Structure

```
tests/
├── api/                    # API test specs
│   ├── delete-employees.spec.ts
│   ├── get-employees.spec.ts
│   ├── post-employees.spec.ts
│   └── put-employees.spec.ts
├── ui/                     # UI test specs
│   ├── add-employee.spec.ts
│   ├── delete-employee.spec.ts
│   ├── edit-employee.spec.ts
│   ├── form-validation.spec.ts
│   ├── homepage.spec.ts
│   └── login.spec.ts
├── pages/                  # Page Object Models
│   ├── dashboard.page.ts
│   └── login.page.ts
└── helpers/                # Shared utilities
    ├── api.helper.ts
    └── fixtures.ts
```

## Test Configuration

- **Browser**: Chromium only
- **Retries**: 0 (no automatic retries)
- **Parallelism**: Fully parallel in local, single worker in CI
- **Traces**: Captured on first retry
- **Screenshots**: Captured only on failure

## Troubleshooting

- **Tests time out on login**: Verify that `USERNAME` and `PASSWORD` in `.env` are correct.
- **API tests fail with auth errors**: Confirm `API_AUTH` contains a valid Basic auth token.
- **Browser not found**: Run `npx playwright install chromium` to download the browser binary.
- **Environment variables not loading**: Ensure the `.env` file is in the project root (`STE-Challenge/.env`).
