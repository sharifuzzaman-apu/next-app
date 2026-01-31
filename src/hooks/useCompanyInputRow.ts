import { useEffect, useState } from 'react';
import { CompanyInput } from '@/lib/types';

type NumericField = Exclude<keyof CompanyInput, 'id' | 'companyName'>;

/**
 * Custom hook for managing company input row state
 * Handles draft values for decimal input (e.g., ".05")
 */
export function useCompanyInputRow(company: CompanyInput) {
  const [draftValues, setDraftValues] = useState<Record<NumericField, string>>({
    numberOfNumbers: company.numberOfNumbers
      ? String(company.numberOfNumbers)
      : '',
    numberOfSMS: company.numberOfSMS ? String(company.numberOfSMS) : '',
    priceRate: company.priceRate ? String(company.priceRate) : '',
    intercloudRate: company.intercloudRate
      ? String(company.intercloudRate)
      : '',
    btrcRate: company.btrcRate ? String(company.btrcRate) : '',
  });

  // Sync draft values when company data changes (e.g., from edit)
  useEffect(() => {
    setDraftValues({
      numberOfNumbers: company.numberOfNumbers
        ? String(company.numberOfNumbers)
        : '',
      numberOfSMS: company.numberOfSMS ? String(company.numberOfSMS) : '',
      priceRate: company.priceRate ? String(company.priceRate) : '',
      intercloudRate: company.intercloudRate
        ? String(company.intercloudRate)
        : '',
      btrcRate: company.btrcRate ? String(company.btrcRate) : '',
    });
  }, [
    company.numberOfNumbers,
    company.numberOfSMS,
    company.priceRate,
    company.intercloudRate,
    company.btrcRate,
  ]);

  const handleNumericChange = (
    field: NumericField,
    rawValue: string,
    onChange: (value: number) => void,
  ) => {
    // Allow partial decimal inputs like ".", ".0", ".05"
    setDraftValues((prev) => ({ ...prev, [field]: rawValue }));

    if (rawValue === '' || rawValue === '.') {
      onChange(0);
    } else {
      const numValue = parseFloat(rawValue);
      onChange(isNaN(numValue) ? 0 : numValue);
    }
  };

  return {
    draftValues,
    handleNumericChange,
  };
}
