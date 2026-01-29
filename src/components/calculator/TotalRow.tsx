import React from 'react';
import { TotalsSummary } from '@/lib/types';
import { formatCurrency, formatInteger } from '@/lib/formatters';

interface TotalRowProps {
  totals: TotalsSummary;
}

export default function TotalRow({ totals }: TotalRowProps) {
  return (
    <tr className="bg-blue-100 font-bold border-t-2 border-blue-300">
      <td className="px-4 py-3 text-left text-blue-900">TOTAL</td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatInteger(totals.totalNumberOfNumbers)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatInteger(totals.totalNumberOfSMS)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">-</td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalPriceCharged)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalVATForPrice)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">-</td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalPaidToIntercloud)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalVATIntercloud)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalPaidToIntercloudWithVAT)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">-</td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalPaidToBTRC)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalVATBTRC)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalPaidToBTRCWithVAT)}
      </td>
      <td className="px-4 py-3 text-right text-blue-900">
        {formatCurrency(totals.totalExtraVATToGovt)}
      </td>
      <td className="px-4 py-3 text-right text-green-700 text-lg">
        {formatCurrency(totals.totalGrossProfit)}
      </td>
    </tr>
  );
}
