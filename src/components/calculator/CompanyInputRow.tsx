'use client';

import React from 'react';
import { CompanyInput } from '@/lib/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useCompanyInputRow } from '@/hooks/useCompanyInputRow';

interface CompanyInputRowProps {
  company: CompanyInput;
  index: number;
  onChange: (
    index: number,
    field: keyof CompanyInput,
    value: string | number,
  ) => void;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export default function CompanyInputRow({
  company,
  index,
  onChange,
  onRemove,
  showRemove,
}: CompanyInputRowProps) {
  const { draftValues, handleNumericChange } = useCompanyInputRow(company);

  const handleInputChange =
    (field: keyof CompanyInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'companyName') {
        onChange(index, field, e.target.value);
      } else {
        handleNumericChange(
          field as Exclude<keyof CompanyInput, 'id' | 'companyName'>,
          e.target.value,
          (value) => onChange(index, field, value),
        );
      }
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-blue-50 items-end border border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
      <div className="">
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="Company Name"
          type="text"
          placeholder="Enter name"
          value={company.companyName}
          onChange={handleInputChange('companyName')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="No. of Numbers"
          type="number"
          min="0"
          placeholder="0"
          value={draftValues.numberOfNumbers}
          onChange={handleInputChange('numberOfNumbers')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="No. of SMS"
          type="number"
          min="0"
          placeholder="0"
          value={draftValues.numberOfSMS}
          onChange={handleInputChange('numberOfSMS')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="Price Rate"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={draftValues.priceRate}
          onChange={handleInputChange('priceRate')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="Intercloud Rate"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={draftValues.intercloudRate}
          onChange={handleInputChange('intercloudRate')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 border-blue-200 rounded-xl bg-white hover:border-blue-400 transition-colors shadow-sm"
          label="BTRC Rate"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={draftValues.btrcRate}
          onChange={handleInputChange('btrcRate')}
          required
        />
      </div>

      <div className="flex items-end">
        {showRemove && (
          <Button
            variant="danger"
            size="md"
            onClick={() => onRemove(index)}
            type="button"
            className="w-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            ❌ Remove
          </Button>
        )}
      </div>
    </div>
  );
}
