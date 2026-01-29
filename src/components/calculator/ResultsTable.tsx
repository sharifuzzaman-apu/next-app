import React from 'react';
import { CompanyData } from '@/lib/types';
import { calculateTotals } from '@/lib/calculations';
import Card from '@/components/ui/Card';
import ResultsTableRow from './ResultsTableRow';
import TotalRow from './TotalRow';

interface ResultsTableProps {
  data: CompanyData[];
}

export default function ResultsTable({ data }: ResultsTableProps) {
  const totals = calculateTotals(data);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Calculation Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">
                Company Name
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                No. of Numbers
              </th>
              <th className="px-4 py-3 text-right font-semibold">No. of SMS</th>
              <th className="px-4 py-3 text-right font-semibold">Price Rate</th>
              <th className="px-4 py-3 text-right font-semibold">
                Price Charged
              </th>
              <th className="px-4 py-3 text-right font-semibold">VAT (15%)</th>
              <th className="px-4 py-3 text-right font-semibold">
                Intercloud Rate
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                Paid to Intercloud
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                VAT Intercloud
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                Total Paid Intercloud
              </th>
              <th className="px-4 py-3 text-right font-semibold">BTRC Rate</th>
              <th className="px-4 py-3 text-right font-semibold">
                Paid to BTRC
              </th>
              <th className="px-4 py-3 text-right font-semibold">VAT BTRC</th>
              <th className="px-4 py-3 text-right font-semibold">
                Total Paid BTRC
              </th>
              <th className="px-4 py-3 text-right font-semibold">Extra VAT</th>
              <th className="px-4 py-3 text-right font-semibold">
                Gross Profit
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((company) => (
              <ResultsTableRow key={company.id} company={company} />
            ))}
            <TotalRow totals={totals} />
          </tbody>
        </table>
      </div>
    </Card>
  );
}
