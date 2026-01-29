/**
 * Formatting utilities for displaying numbers and currency
 */

/**
 * Format number as currency (with 2 decimal places)
 * @param value - Number to format
 * @returns Formatted string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number as integer (no decimal places)
 * @param value - Number to format
 * @returns Formatted string
 */
export function formatInteger(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Parse formatted string back to number
 * @param value - String to parse
 * @returns Number
 */
export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
