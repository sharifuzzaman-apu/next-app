import { useState } from 'react';
import { CompanyInput } from '@/lib/types';
import { generateId } from '@/lib/utils';

/**
 * Custom hook for managing company list state
 */
export function useCompanies() {
  const [companies, setCompanies] = useState<CompanyInput[]>([
    {
      id: generateId(),
      companyName: '',
      numberOfNumbers: 0,
      numberOfSMS: 0,
      priceRate: 0,
      intercloudRate: 0,
      btrcRate: 0,
    },
  ]);

  const addCompany = () => {
    setCompanies([
      ...companies,
      {
        id: generateId(),
        companyName: '',
        numberOfNumbers: 0,
        numberOfSMS: 0,
        priceRate: 0,
        intercloudRate: 0,
        btrcRate: 0,
      },
    ]);
  };

  const removeCompany = (index: number) => {
    if (companies.length > 1) {
      setCompanies(companies.filter((_, i) => i !== index));
    }
  };

  const updateCompany = (
    index: number,
    field: keyof CompanyInput,
    value: string | number,
  ) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      [field]: value,
    };
    setCompanies(updatedCompanies);
  };

  const resetCompanies = () => {
    setCompanies([
      {
        id: generateId(),
        companyName: '',
        numberOfNumbers: 0,
        numberOfSMS: 0,
        priceRate: 0,
        intercloudRate: 0,
        btrcRate: 0,
      },
    ]);
  };

  const loadCompanies = (companiesToLoad: CompanyInput[]) => {
    setCompanies(companiesToLoad);
  };

  return {
    companies,
    addCompany,
    removeCompany,
    updateCompany,
    resetCompanies,
    loadCompanies,
  };
}
