/**
 * Validation functions for form inputs
 */

import { CompanyInput, FormErrors } from './types';
import { MIN_VALUES } from './constants';

/**
 * Validate a single company input
 * @param company - Company input data
 * @returns Object with error messages (empty if valid)
 */
export function validateCompanyInput(company: CompanyInput): FormErrors {
  const errors: FormErrors = {};

  // Validate company name
  if (!company.companyName || company.companyName.trim() === '') {
    errors.companyName = 'Company name is required';
  }

  // Validate number of numbers
  if (company.numberOfNumbers < MIN_VALUES.numberOfNumbers) {
    errors.numberOfNumbers = `Must be at least ${MIN_VALUES.numberOfNumbers}`;
  }

  // Validate number of SMS
  if (company.numberOfSMS < MIN_VALUES.numberOfSMS) {
    errors.numberOfSMS = `Must be at least ${MIN_VALUES.numberOfSMS}`;
  }

  // Validate price rate
  if (company.priceRate < MIN_VALUES.priceRate) {
    errors.priceRate = `Must be at least ${MIN_VALUES.priceRate}`;
  }

  // Validate intercloud rate
  if (company.intercloudRate < MIN_VALUES.intercloudRate) {
    errors.intercloudRate = `Must be at least ${MIN_VALUES.intercloudRate}`;
  }

  // Validate BTRC rate
  if (company.btrcRate < MIN_VALUES.btrcRate) {
    errors.btrcRate = `Must be at least ${MIN_VALUES.btrcRate}`;
  }

  return errors;
}

/**
 * Validate all companies
 * @param companies - Array of company inputs
 * @returns True if all valid, false otherwise
 */
export function validateAllCompanies(companies: CompanyInput[]): boolean {
  if (companies.length === 0) {
    return false;
  }

  return companies.every((company) => {
    const errors = validateCompanyInput(company);
    return Object.keys(errors).length === 0;
  });
}

/**
 * Check if a string is a valid number
 * @param value - String to check
 * @returns True if valid number, false otherwise
 */
export function isValidNumber(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
}
