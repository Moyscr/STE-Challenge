# Test Cases — Benefits Dashboard

## UI Test Cases

### TC-001: Login

| Field | Details |
|-------|---------|
| **Description** | Verify user can log in to the Benefits Dashboard with valid credentials |
| **Preconditions** | User has valid credentials |
| **Steps** | 1. Navigate to the Benefits Dashboard URL<br>2. Enter username<br>3. Enter password<br>4. Click Login |
| **Expected Result** | User is redirected to the Benefits Dashboard home page |

---

### TC-002: Home Page UI

| Field | Details |
|-------|---------|
| **Description** | Verify the Benefits Dashboard home page displays correctly |
| **Preconditions** | User is logged in |
| **Steps** | 1. Navigate to the Benefits Dashboard<br>2. Verify page elements are visible |
| **Expected Result** | Dashboard displays the employee table with correct columns (Id, Last Name, First Name, Dependents, Salary, Gross Pay, Benefits Cost, Net Pay, Actions) and the Add Employee button is visible |

---

### TC-003: Add Employee

| Field | Details |
|-------|---------|
| **Description** | Verify an employer can add a new employee with dependents |
| **Preconditions** | User is logged in and on the Benefits Dashboard |
| **Steps** | 1. Click Add Employee<br>2. Enter First Name<br>3. Enter Last Name<br>4. Enter Dependents count<br>5. Click Add |
| **Expected Result** | Employee appears in the table with correct benefit cost calculations |

---

### TC-004: Edit Employee

| Field | Details |
|-------|---------|
| **Description** | Verify an employer can edit an existing employee's details |
| **Preconditions** | User is logged in and at least one employee exists in the table |
| **Steps** | 1. Locate an employee in the table<br>2. Click the Edit action<br>3. Modify employee details<br>4. Click Update |
| **Expected Result** | Employee data is updated in the table and calculations reflect the changes |

---

### TC-005: Delete Employee

| Field | Details |
|-------|---------|
| **Description** | Verify an employer can delete an employee |
| **Preconditions** | User is logged in and at least one employee exists in the table |
| **Steps** | 1. Locate an employee in the table<br>2. Click the Delete (X) action<br>3. Confirm deletion |
| **Expected Result** | Employee is removed from the table |

---

### TC-006: Form Fields Validation

| Field | Details |
|-------|---------|
| **Description** | Verify form validation on the Add/Edit Employee modal |
| **Preconditions** | User is logged in and on the Benefits Dashboard |
| **Steps** | 1. Click Add Employee<br>2. Leave required fields empty<br>3. Attempt to submit<br>4. Enter invalid data in fields |
| **Expected Result** | Appropriate validation messages are displayed and form does not submit with invalid data |

---

## API Test Cases

### TC-007: POST Valid Employee

| Field | Details |
|-------|---------|
| **Description** | Verify creating a new employee via API with valid data |
| **Preconditions** | Valid authorization token |
| **Steps** | 1. Send POST request with valid employee payload (firstName, lastName, dependents) |
| **Expected Result** | Response returns 200/201 with the created employee data including generated ID |

---

### TC-008: POST With Missing Fields

| Field | Details |
|-------|---------|
| **Description** | Verify API response when creating an employee with missing required fields |
| **Preconditions** | Valid authorization token |
| **Steps** | 1. Send POST request with incomplete payload (missing firstName, lastName, or dependents) |
| **Expected Result** | Response returns 4xx error with appropriate error message |

---

### TC-009: PUT With Existing ID

| Field | Details |
|-------|---------|
| **Description** | Verify updating an existing employee via API |
| **Preconditions** | Valid authorization token and an existing employee ID |
| **Steps** | 1. Send PUT request with valid employee ID and updated payload |
| **Expected Result** | Response returns 200 with the updated employee data |

---

### TC-010: PUT With Invalid ID

| Field | Details |
|-------|---------|
| **Description** | Verify API response when updating a non-existent employee |
| **Preconditions** | Valid authorization token |
| **Steps** | 1. Send PUT request with a non-existent employee ID |
| **Expected Result** | Response returns 404 or appropriate error status |

---

### TC-011: DELETE With Existing ID

| Field | Details |
|-------|---------|
| **Description** | Verify deleting an existing employee via API |
| **Preconditions** | Valid authorization token and an existing employee ID |
| **Steps** | 1. Send DELETE request with a valid employee ID |
| **Expected Result** | Response returns 200/204 and employee is removed |

---

### TC-012: DELETE With Invalid ID

| Field | Details |
|-------|---------|
| **Description** | Verify API response when deleting a non-existent employee |
| **Preconditions** | Valid authorization token |
| **Steps** | 1. Send DELETE request with a non-existent employee ID |
| **Expected Result** | Response returns 404 or appropriate error status |

---

### TC-013: GET All Employees

| Field | Details |
|-------|---------|
| **Description** | Verify retrieving the full list of employees via API |
| **Preconditions** | Valid authorization token |
| **Steps** | 1. Send GET request to the employees endpoint |
| **Expected Result** | Response returns 200 with an array of all employees |

---

### TC-014: GET Employee With ID

| Field | Details |
|-------|---------|
| **Description** | Verify retrieving a single employee by ID via API |
| **Preconditions** | Valid authorization token and an existing employee ID |
| **Steps** | 1. Send GET request with a valid employee ID |
| **Expected Result** | Response returns 200 with the employee data matching the requested ID |

---

### TC-015: GET Deleted Employee

| Field | Details |
|-------|---------|
| **Description** | Verify API response when retrieving a previously deleted employee |
| **Preconditions** | Valid authorization token and a previously deleted employee ID |
| **Steps** | 1. Delete an employee<br>2. Send GET request with the deleted employee's ID |
| **Expected Result** | Response returns 404 or empty result indicating employee no longer exists |
