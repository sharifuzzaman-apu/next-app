'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import CompanyInputForm from '@/components/calculator/CompanyInputForm';
import ResultsTable from '@/components/calculator/ResultsTable';
import CalculatorActions from '@/components/calculator/CalculatorActions';
import { CompanyInput, CompanyData } from '@/lib/types';
import { calculateCompanyBilling } from '@/lib/calculations';

export default function NonMaskingCalculator() {
  const [results, setResults] = useState<CompanyData[]>([]);

  const handleSubmit = (companies: CompanyInput[]) => {
    const calculatedResults = companies.map((company) => ({
      ...company,
      ...calculateCompanyBilling(company),
    }));
    setResults(calculatedResults);
  };

  const handleReset = () => {
    setResults([]);
    window.location.reload();
  };

  const handleExport = () => {
    // Future feature: Export to Excel/PDF
    alert('Export feature coming soon!');
  };

  return (
    <Container>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Non-Masking SMS Calculator
          </h1>
          <p className="text-gray-600">
            Calculate billing and gross profit for non-masking SMS services
          </p>
        </div>

        <CompanyInputForm onSubmit={handleSubmit} />

        {results.length > 0 && (
          <>
            <ResultsTable data={results} />
            <CalculatorActions
              onExport={handleExport}
              onReset={handleReset}
              hasResults={results.length > 0}
            />
          </>
        )}
      </div>
    </Container>
  );
}
