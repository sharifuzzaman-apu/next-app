import { CompanyInput, CompanyData, TotalsSummary } from '@/lib/types';
import { calculateCompanyBilling, calculateTotals } from '@/lib/calculations';
import { useLocalStorage } from './useLocalStorage';

/**
 * non-masking calculator logic
 */
export function useNonMaskingCalculator() {
  const {
    value: results,
    setValue: setResults,
    removeValue: clearResults,
  } = useLocalStorage<CompanyData[]>('nonMaskingResults', []);

  const {
    value: totals,
    setValue: setTotals,
    removeValue: clearTotals,
  } = useLocalStorage<TotalsSummary | null>('nonMaskingTotals', null);

  const calculate = (companies: CompanyInput[]) => {
    const newCalculatedResults = companies.map((company) => ({
      ...company,
      ...calculateCompanyBilling(company),
    }));

    // Append
    const allResults = [...results, ...newCalculatedResults];
    setResults(allResults);

    const calculatedTotals = calculateTotals(allResults);
    setTotals(calculatedTotals);

    return { results: allResults, totals: calculatedTotals };
  };

  const reset = () => {
    clearResults();
    clearTotals();
  };

  const removeResult = (companyId: string) => {
    const updatedResults = results.filter((r) => r.id !== companyId);
    setResults(updatedResults);

    if (updatedResults.length > 0) {
      const calculatedTotals = calculateTotals(updatedResults);
      setTotals(calculatedTotals);
    } else {
      clearTotals();
    }
  };

  return {
    results,
    totals,
    calculate,
    reset,
    removeResult,
  };
}
