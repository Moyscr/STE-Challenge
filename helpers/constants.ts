export const COLUMNS = {
  ID: 0,
  FIRST_NAME: 1,
  LAST_NAME: 2,
  DEPENDENTS: 3,
  SALARY: 4,
  GROSS_PAY: 5,
  BENEFITS_COST: 6,
  NET_PAY: 7,
};

export const ANNUAL_SALARY = 52000;
export const PAY_PERIODS = 26;
export const BENEFITS_BASE_COST = 1000;
export const DEPENDENT_COST = 500;

export function expectedGrossPay(): string {
  return (ANNUAL_SALARY / PAY_PERIODS).toFixed(2);
}

export function expectedBenefitsCost(dependents: number): string {
  return ((BENEFITS_BASE_COST + dependents * DEPENDENT_COST) / PAY_PERIODS).toFixed(2);
}

export function expectedNetPay(dependents: number): string {
  const grossPay = ANNUAL_SALARY / PAY_PERIODS;
  const benefitsCost = (BENEFITS_BASE_COST + dependents * DEPENDENT_COST) / PAY_PERIODS;
  return (grossPay - benefitsCost).toFixed(2);
}
