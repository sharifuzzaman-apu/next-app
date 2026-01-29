'use client';

import React, { useState } from 'react';
import { CompanyInput } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { validateAllCompanies } from '@/lib/validators';
import CompanyInputRow from './CompanyInputRow';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface CompanyInputFormProps {
  onSubmit: (companies: CompanyInput[]) => void;
}

export default function CompanyInputForm({ onSubmit }: CompanyInputFormProps) {
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

  const handleAddCompany = () => {
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

  const handleRemoveCompany = (index: number) => {
    if (companies.length > 1) {
      setCompanies(companies.filter((_, i) => i !== index));
    }
  };

  const handleCompanyChange = (
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAllCompanies(companies)) {
      onSubmit(companies);
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  };

  const handleReset = () => {
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

  return (
    <Card className="w-1/2 border-2 mx-auto bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Input</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {companies.map((company, index) => (
          <CompanyInputRow
            key={company.id}
            company={company}
            index={index}
            onChange={handleCompanyChange}
            onRemove={handleRemoveCompany}
            showRemove={companies.length > 1}
          />
        ))}

        <div className="flex flex-wrap gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleAddCompany}>
            + Add Another Company
          </Button>

          <Button type="submit" variant="primary">
            Calculate
          </Button>

          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
