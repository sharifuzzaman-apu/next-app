import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CompanyData, TotalsSummary } from '@/lib/types';
import { formatCurrency, formatInteger } from '@/lib/formatters';

interface ExportOptions {
  filename?: string;
}

export const generatePDF = (
  results: CompanyData[],
  totals: TotalsSummary,
  options: ExportOptions = {},
) => {
  const { filename = 'SMS-Billing-Report.pdf' } = options;

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  // Set font
  doc.setFontSize(16);
  doc.text('SMS Billing Calculation Report', 14, 20);

  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Table headers
  const headers = [
    'Company Name',
    'No. Numbers',
    'No. SMS',
    'Price Rate',
    'Price Charged',
    'VAT (15%)',
    'Intercloud Rate',
    'Paid to Intercloud',
    'VAT Intercloud',
    'Total Paid Intercloud',
    'BTRC Rate',
    'Paid to BTRC',
    'VAT BTRC',
    'Total Paid BTRC',
    'Extra VAT',
    'Gross Profit',
  ];

  // Table data
  const tableData = results.map((company) => [
    company.companyName,
    formatInteger(company.numberOfNumbers),
    formatInteger(company.numberOfSMS),
    formatCurrency(company.priceRate),
    formatCurrency(company.priceCharged),
    formatCurrency(company.vatForPrice),
    formatCurrency(company.intercloudRate),
    formatCurrency(company.paidToIntercloud),
    formatCurrency(company.vatIntercloud),
    formatCurrency(company.totalPaidToIntercloud),
    formatCurrency(company.btrcRate),
    formatCurrency(company.paidToBTRC),
    formatCurrency(company.vatBTRC),
    formatCurrency(company.totalPaidToBTRC),
    formatCurrency(company.extraVATToGovt),
    formatCurrency(company.grossProfit),
  ]);

  // Add totals row
  tableData.push([
    'TOTAL',
    formatInteger(totals.totalNumberOfNumbers),
    formatInteger(totals.totalNumberOfSMS),
    '-',
    formatCurrency(totals.totalPriceCharged),
    formatCurrency(totals.totalVATForPrice),
    '-',
    formatCurrency(totals.totalPaidToIntercloud),
    formatCurrency(totals.totalVATIntercloud),
    formatCurrency(totals.totalPaidToIntercloudWithVAT),
    '-',
    formatCurrency(totals.totalPaidToBTRC),
    formatCurrency(totals.totalVATBTRC),
    formatCurrency(totals.totalPaidToBTRCWithVAT),
    formatCurrency(totals.totalExtraVATToGovt),
    formatCurrency(totals.totalGrossProfit),
  ]);

  // Use autoTable for better table formatting
  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.getWidth();

  autoTable(doc, {
    head: [headers] as any,
    body: tableData as any,
    startY: 40,
    margin: 10,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 8,
      halign: 'center',
    },
    bodyStyles: {
      fontSize: 8,
      halign: 'right',
    },
    columnStyles: {
      0: { halign: 'left' },
    },
    didDrawPage: (data: any) => {
      // Footer
      const pageCount = doc.getNumberOfPages();
      const pageNum = data.pageNumber;
      const bottomMargin = 280;
      doc.setFontSize(9);
      doc.text(`Page ${pageNum} of ${pageCount}`, pageWidth / 2, bottomMargin, {
        align: 'center',
      });
    },
  });

  // Save the PDF
  doc.save(filename);
};
