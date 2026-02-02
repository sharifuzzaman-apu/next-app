'use client';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import BalanceStats from '@/components/accounting/BalanceStats';
import Link from 'next/link';
import { addLoan, deleteLoan } from '@/lib/redux/features/loan/loanSlice';
import { addCashTransaction } from '@/lib/redux/features/cash/cashSlice';
import { RootState } from '@/lib/redux/store';
import { FaHandHoldingUsd, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function MaskingCalculator() {
  const dispatch = useDispatch();
  const {
    loans = [],
    totalLoanTaken = 0,
    totalLoanPaid = 0,
    totalLoanRemaining = 0,
  } = useSelector((state: RootState) => state.loan || {});

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this loan?')) {
      dispatch(deleteLoan(id));
      toast.success('Loan deleted');
    }
  };

  const stats = [
    {
      title: 'Total Loan Taken',
      value: `${(totalLoanTaken || 0).toFixed(2)}`,
      icon: <FaHandHoldingUsd />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${loans.length} loans`,
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Total Paid',
      value: `${(totalLoanPaid || 0).toFixed(2)}`,
      icon: '✅',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Repaid',
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Remaining',
      value: `${(totalLoanRemaining || 0).toFixed(2)}`,
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'To pay',
      badgeVariant: 'gray' as const,
    },
  ];

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (loan: any) => format(new Date(loan.date), 'dd MMM yyyy'),
    },
    {
      key: 'receivedFrom',
      label: 'Received From',
      render: (loan: any) => (
        <span className="font-medium">{loan.receivedFrom}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Loan Amount',
      render: (loan: any) => (
        <span className="font-medium">{(loan.amount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'paidAmount',
      label: 'Paid',
      render: (loan: any) => (
        <span className="text-green-600 font-medium">
          {(loan.paidAmount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'remainingAmount',
      label: 'Remaining',
      render: (loan: any) => (
        <span className="text-red-600 font-semibold">
          {(loan.remainingAmount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (loan: any) => (
        <Badge variant="gray">
          {loan.remainingAmount === 0
            ? 'Paid'
            : loan.paidAmount > 0
              ? 'Partial'
              : 'Unpaid'}
        </Badge>
      ),
    },
    { key: 'note', label: 'Note', render: (loan: any) => loan.note || '-' },
    {
      key: 'actions',
      label: 'Actions',
      render: (loan: any) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(loan.id)}
        >
          <FaTrash />
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <div className="space-y-6">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <FaHandHoldingUsd className="text-2xl text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Loan Management
              </h1>
              <p className="text-sm text-gray-600">
                Take loans (auto adds to cash)
              </p>
            </div>
          </div>
        </div>

        <BalanceStats stats={stats} />

        <div className="mb-6">
          <Link href="/cash">
            <Button variant="warning" className="w-full md:w-auto">
              + Add New Loan
            </Button>
          </Link>
        </div>

        <Card title="Loan History">
          <Table columns={columns} data={loans} emptyMessage="No loans yet" />
        </Card>
      </div>
    </Container>
  );
}
