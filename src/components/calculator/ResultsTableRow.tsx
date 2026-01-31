import React from 'react';
import { CompanyData } from '@/lib/types';
import { formatCurrency, formatInteger } from '@/lib/formatters';

interface ResultsTableRowProps {
  company: CompanyData;
  onEdit?: (company: CompanyData) => void;
}

export default function ResultsTableRow({
  company,
  onEdit,
}: ResultsTableRowProps) {
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
      <td className="px-4 py-3 text-center">
        {onEdit && (
          <button
            onClick={() => onEdit(company)}
            className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all transform hover:scale-110"
            title="Edit calculation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
}
