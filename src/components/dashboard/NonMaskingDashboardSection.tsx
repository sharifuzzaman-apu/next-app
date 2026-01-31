import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import { formatCurrency } from '@/lib/formatters';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TotalsSummary } from '@/lib/types';

export default function NonMaskingDashboardSection() {
  const { value: totals } = useLocalStorage<TotalsSummary | null>(
    'nonMaskingTotals',
    null,
  );

  return (
    <div>
      <SectionHeader
        icon=""
        title="Non-Masking SMS"
        linkHref="/non-masking"
        linkText="Open Calculator"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          gradient="blue"
          title="Total Price Charged"
          value={totals ? formatCurrency(totals.totalPriceCharged) : '-'}
          subtitle={
            totals
              ? `${totals.totalNumberOfSMS.toLocaleString()} SMS`
              : 'Calculate to view'
          }
        />

        <StatCard
          gradient="purple"
          title="Total VAT (15%)"
          value={totals ? formatCurrency(totals.totalVATForPrice) : '-'}
          subtitle={totals ? 'Inclusive VAT' : 'Calculate to view'}
        />

        <StatCard
          gradient="orange"
          title="Extra VAT to Govt."
          value={totals ? formatCurrency(totals.totalExtraVATToGovt) : '-'}
          subtitle={totals ? 'After deductions' : 'Calculate to view'}
        />

        <StatCard
          gradient="green"
          title="Total Gross Profit"
          value={totals ? formatCurrency(totals.totalGrossProfit) : '-'}
          subtitle={totals ? 'Net earnings' : 'Calculate to view'}
        />
      </div>
    </div>
  );
}
