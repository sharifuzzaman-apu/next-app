import React from 'react';
import { CompanyData } from '@/lib/types';
import { formatCurrency, formatInteger } from '@/lib/formatters';

interface ResultsTableRowProps {
  company: CompanyData;
}

export default function ResultsTableRow({ company }: ResultsTableRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-left font-medium text-gray-800">
        {company.companyName}
      </td>
      <td className="px-4 py-3 text-right">
        {formatInteger(company.numberOfNumbers)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatInteger(company.numberOfSMS)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.priceRate)}
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {formatCurrency(company.priceCharged)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.vatForPrice)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.intercloudRate)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.paidToIntercloud)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.vatIntercloud)}
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {formatCurrency(company.totalPaidToIntercloud)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.btrcRate)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.paidToBTRC)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.vatBTRC)}
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {formatCurrency(company.totalPaidToBTRC)}
      </td>
      <td className="px-4 py-3 text-right">
        {formatCurrency(company.extraVATToGovt)}
      </td>
      <td className="px-4 py-3 text-right font-bold text-green-600">
        {formatCurrency(company.grossProfit)}
      </td>
    </tr>
  );
}
