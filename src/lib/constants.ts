/**
 * Constants for SMS Billing Calculator
 */

// VAT rate (5%)
export const VAT_RATE_BUY = 0.05;

// VAT rate (15%)
export const VAT_RATE = 0.15;

// Default values for new company row
export const DEFAULT_COMPANY_INPUT = {
  companyName: '',
  numberOfNumbers: 0,
  numberOfSMS: 0,
  priceRate: 0,
  intercloudRate: 0,
  btrcRate: 0,
};

// Minimum values for validation
export const MIN_VALUES = {
  numberOfNumbers: 0,
  numberOfSMS: 0,
  priceRate: 0,
  intercloudRate: 0,
  btrcRate: 0,
};

// Field labels for display
export const FIELD_LABELS = {
  companyName: 'Company Name',
  numberOfNumbers: 'No. of Numbers',
  numberOfSMS: 'No. of SMS',
  priceRate: 'Price Rate',
  intercloudRate: 'Intercloud Rate',
  btrcRate: 'BTRC Rate',
  priceCharged: 'Price Charged',
  vatForPrice: 'VAT (15%)',
  paidToIntercloud: 'Paid to Intercloud',
  vatIntercloud: 'VAT Intercloud',
  totalPaidToIntercloud: 'Total Paid to Intercloud',
  paidToBTRC: 'Paid to BTRC',
  vatBTRC: 'VAT BTRC',
  totalPaidToBTRC: 'Total Paid to BTRC',
  extraVATToGovt: 'Extra VAT to Govt.',
  grossProfit: 'Gross Profit',
};
