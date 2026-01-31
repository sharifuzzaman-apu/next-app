'use client';

import Container from '@/components/layout/Container';
import CompanyInputForm from '@/components/calculator/CompanyInputForm';
import ResultsTable from '@/components/calculator/ResultsTable';
import CalculatorActions from '@/components/calculator/CalculatorActions';
import PageHeader from '@/components/ui/PageHeader';
import { CompanyInput } from '@/lib/types';
import { useNonMaskingCalculator } from '@/hooks/useCalculations';
import { useToast } from '@/components/ui/toast/ToastProvider';
import { generatePDF } from '@/lib/pdfExport';
import { calculateTotals } from '@/lib/calculations';

export default function NonMaskingCalculator() {
  const { results, totals, calculate, reset, removeResult } =
    useNonMaskingCalculator();
  const { showToast } = useToast();

  const handleSubmit = (companies: CompanyInput[]) => {
    calculate(companies);
    // Auto-reset form after calculation
    if ((window as any).__formReset) {
      (window as any).__formReset();
    }
  };

  const handleReset = () => {
    reset();
    if ((window as any).__formReset) {
      (window as any).__formReset();
    }
    showToast('All calculations cleared', 'info');
  };

  const handleExport = () => {
    if (results.length === 0) {
      showToast('No results to export', 'warning');
      return;
    }

    try {
      const computedTotals = totals ?? calculateTotals(results);

      generatePDF(results, computedTotals);
      showToast('PDF exported successfully!', 'success');
    } catch (error) {
      showToast('Failed to export PDF', 'error');
      console.error('PDF export error:', error);
    }
  };

  const handleEdit = (company: CompanyInput) => {
    // Remove from results table
    removeResult(company.id);

    // Load into form for editing
    if ((window as any).__formDataLoad) {
      (window as any).__formDataLoad([company]);
    }

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Editing: ${company.companyName}`, 'info');
  };

  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Non-Masking SMS Calculator"
          subtitle="Calculate billing and gross profit for non-masking SMS services"
        />

        <CompanyInputForm
          onSubmit={handleSubmit}
          onFormReset={() => {}}
          onFormDataLoad={() => {}}
        />

        {results.length > 0 && (
          <>
            <ResultsTable data={results} onEdit={handleEdit} />
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
