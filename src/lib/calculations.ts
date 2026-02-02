/**
 * Calculation functions for SMS Billing Calculator
 */

import {
  CompanyInput,
  CompanyOutput,
  CompanyData,
  TotalsSummary,
} from './types';
import { VAT_RATE_BUY } from './constants';
import { VAT_RATE } from './constants';

/**
 * Calculate all billing outputs for a single company
 * @param input - Company input data
 * @returns Calculated output values
 */
export function calculateCompanyBilling(input: CompanyInput): CompanyOutput {
  // 1. Price charged = No. of SMS × Price rate
  const priceCharged = input.numberOfSMS * input.priceRate;

  // 2. VAT for the price (inclusive) = Price charged × 15 / 115
  const vatForPrice = priceCharged * (VAT_RATE_BUY / (1 + VAT_RATE_BUY));

  // 3. Paid to Intercloud = No. of SMS × Intercloud rate
  const paidToIntercloud = input.numberOfSMS * input.intercloudRate;

  // 4. VAT Intercloud = Paid to Intercloud × 15%
  const vatIntercloud = paidToIntercloud * VAT_RATE;

  // 5. Total Paid to Intercloud = Paid to Intercloud + VAT Intercloud
  const totalPaidToIntercloud = paidToIntercloud + vatIntercloud;

  // 6. Paid to BTRC = No. of numbers × BTRC rate
  const paidToBTRC = input.numberOfNumbers * input.btrcRate;

  // 7. VAT BTRC = Paid to BTRC × 15%
  const vatBTRC = paidToBTRC * VAT_RATE;

  // 8. Total Paid to BTRC = Paid to BTRC + VAT BTRC
  const totalPaidToBTRC = paidToBTRC + vatBTRC;

  // 9. Extra VAT to give to govt. = VAT price − VAT Intercloud − VAT BTRC
  const extraVATToGovt = vatForPrice - vatIntercloud - vatBTRC;

  // 10. Gross Profit = Price charged − Total Paid to Intercloud − Total Paid to BTRC − Extra VAT to give to govt.
  const grossProfit =
    priceCharged - totalPaidToIntercloud - totalPaidToBTRC - extraVATToGovt;

  return {
    priceCharged,
    vatForPrice,
    paidToIntercloud,
    vatIntercloud,
    totalPaidToIntercloud,
    paidToBTRC,
    vatBTRC,
    totalPaidToBTRC,
    extraVATToGovt,
    grossProfit,
  };
}

/**
 * Calculate totals for all companies
 * @param companies - Array of company data
 * @returns Summary totals
 */
export function calculateTotals(companies: CompanyData[]): TotalsSummary {
  return companies.reduce(
    (totals, company) => ({
      totalNumberOfNumbers:
        totals.totalNumberOfNumbers + company.numberOfNumbers,
      totalNumberOfSMS: totals.totalNumberOfSMS + company.numberOfSMS,
      totalPriceCharged: totals.totalPriceCharged + company.priceCharged,
      totalVATForPrice: totals.totalVATForPrice + company.vatForPrice,
      totalPaidToIntercloud:
        totals.totalPaidToIntercloud + company.paidToIntercloud,
      totalVATIntercloud: totals.totalVATIntercloud + company.vatIntercloud,
      totalPaidToIntercloudWithVAT:
        totals.totalPaidToIntercloudWithVAT + company.totalPaidToIntercloud,
      totalPaidToBTRC: totals.totalPaidToBTRC + company.paidToBTRC,
      totalVATBTRC: totals.totalVATBTRC + company.vatBTRC,
      totalPaidToBTRCWithVAT:
        totals.totalPaidToBTRCWithVAT + company.totalPaidToBTRC,
      totalExtraVATToGovt: totals.totalExtraVATToGovt + company.extraVATToGovt,
      totalGrossProfit: totals.totalGrossProfit + company.grossProfit,
    }),
    {
      totalNumberOfNumbers: 0,
      totalNumberOfSMS: 0,
      totalPriceCharged: 0,
      totalVATForPrice: 0,
      totalPaidToIntercloud: 0,
      totalVATIntercloud: 0,
      totalPaidToIntercloudWithVAT: 0,
      totalPaidToBTRC: 0,
      totalVATBTRC: 0,
      totalPaidToBTRCWithVAT: 0,
      totalExtraVATToGovt: 0,
      totalGrossProfit: 0,
    },
  );
}
