'use client';

import React from 'react';
import { CompanyInput } from '@/lib/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
  const handleInputChange =
    (field: keyof CompanyInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'companyName'
          ? e.target.value
          : parseFloat(e.target.value) || 0;
      onChange(index, field, value);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 rounded-full shadow bg-gray-50 items-end">
      <div className="">
        <Input
          className="border-2 rounded-full bg-gray-100"
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
          className="border-2 rounded-full"
          label="No. of Numbers"
          type="number"
          min="0"
          placeholder="0"
          value={company.numberOfNumbers || ''}
          onChange={handleInputChange('numberOfNumbers')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 rounded-full"
          label="No. of SMS"
          type="number"
          min="0"
          placeholder="0"
          value={company.numberOfSMS || ''}
          onChange={handleInputChange('numberOfSMS')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 rounded-full"
          label="Price Rate"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={company.priceRate || ''}
          onChange={handleInputChange('priceRate')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 rounded-full"
          label="Intercloud Rate"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={company.intercloudRate || ''}
          onChange={handleInputChange('intercloudRate')}
          required
        />
      </div>

      <div>
        <Input
          className="border-2 rounded-full"
          label="BTRC Rate"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={company.btrcRate || ''}
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
            className="w-full"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
