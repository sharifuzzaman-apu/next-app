'use client';

import React from 'react';
import { validateAllCompanies } from '@/lib/validators';
import CompanyInputRow from './CompanyInputRow';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCompanies } from '@/hooks/useCompanies';
import { CompanyInput } from '@/lib/types';
import { useToast } from '@/components/ui/toast/ToastProvider';

interface CompanyInputFormProps {
  onSubmit: (companies: CompanyInput[]) => void;
  onFormReset?: () => void;
  onFormDataLoad?: (data: CompanyInput[]) => void;
}

export default function CompanyInputForm({
  onSubmit,
  onFormReset,
  onFormDataLoad,
}: CompanyInputFormProps) {
  const {
    companies,
    addCompany,
    removeCompany,
    updateCompany,
    resetCompanies,
    loadCompanies,
  } = useCompanies();

  const { showToast } = useToast();

  // Expose reset and load functions through callbacks
  React.useEffect(() => {
    if (onFormReset) {
      // Store function reference for parent to call
      (window as any).__formReset = resetCompanies;
    }
  }, [onFormReset, resetCompanies]);

  React.useEffect(() => {
    if (onFormDataLoad) {
      // Store function reference for parent to call
      (window as any).__formDataLoad = loadCompanies;
    }
  }, [onFormDataLoad, loadCompanies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAllCompanies(companies)) {
      onSubmit(companies);
      showToast('Calculation completed successfully!', 'success');
      // Form will be auto-reset by parent component
    } else {
      showToast(
        'Please fill in all required fields with valid values.',
        'error',
      );
    }
  };

  const handleReset = () => {
    resetCompanies();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 shadow-xl border border-blue-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Company Input
        </h2>
        <p className="text-gray-600 text-sm">
          Enter company details for SMS billing calculation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {companies.map((company, index) => (
          <CompanyInputRow
            key={company.id}
            company={company}
            index={index}
            onChange={updateCompany}
            onRemove={removeCompany}
            showRemove={companies.length > 1}
          />
        ))}

        <div className="flex flex-wrap gap-4 pt-6 border-t border-blue-200 mt-6">
          <Button
            type="submit"
            variant="primary"
            className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🧮 Calculate
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            🔄 Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
