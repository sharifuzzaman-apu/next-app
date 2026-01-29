/**
 * TypeScript interfaces for SMS Billing Calculator
 */

/**
 * Interface for company input data
 */
export interface CompanyInput {
  id: string; // Unique identifier for the company row
  companyName: string;
  numberOfNumbers: number;
  numberOfSMS: number;
  priceRate: number; // Price per SMS
  intercloudRate: number; // Intercloud cost per SMS
  btrcRate: number; // BTRC cost per SMS
}

/**
 * Interface for calculated company output
 */
export interface CompanyOutput {
  priceCharged: number; // No. of SMS × Price rate
  vatForPrice: number; // Price charged × 15%
  paidToIntercloud: number; // No. of SMS × Intercloud rate
  vatIntercloud: number; // Paid to Intercloud × 15%
  totalPaidToIntercloud: number; // Paid to Intercloud + VAT Intercloud
  paidToBTRC: number; // No. of SMS × BTRC rate
  vatBTRC: number; // Paid to BTRC × 15%
  totalPaidToBTRC: number; // Paid to BTRC + VAT BTRC
  extraVATToGovt: number; // VAT price − VAT Intercloud − VAT BTRC
  grossProfit: number; // Final profit calculation
}

/**
 * Combined interface for display (input + output)
 */
export interface CompanyData extends CompanyInput, CompanyOutput {}

/**
 * Interface for totals row
 */
export interface TotalsSummary {
  totalNumberOfNumbers: number;
  totalNumberOfSMS: number;
  totalPriceCharged: number;
  totalVATForPrice: number;
  totalPaidToIntercloud: number;
  totalVATIntercloud: number;
  totalPaidToIntercloudWithVAT: number;
  totalPaidToBTRC: number;
  totalVATBTRC: number;
  totalPaidToBTRCWithVAT: number;
  totalExtraVATToGovt: number;
  totalGrossProfit: number;
}

/**
 * Form state for validation
 */
export interface FormErrors {
  [key: string]: string;
}
