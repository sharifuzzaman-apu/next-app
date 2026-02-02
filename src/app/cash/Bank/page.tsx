'use client';

import { useSelector, useDispatch } from 'react-redux';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import BalanceStats from '@/components/accounting/BalanceStats';
import Link from 'next/link';
import { deleteBankTransaction } from '@/lib/redux/features/bank/bankSlice';
import { RootState } from '@/lib/redux/store';
import { FaUniversity, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function MaskingCalculator() {
  const dispatch = useDispatch();
  const { transactions = [], totalBank = 0 } = useSelector(
    (state: RootState) => state.bank || {},
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch(deleteBankTransaction(id));
      toast.success('Transaction deleted');
    }
  };

  const avgTransaction =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
      : 0;

  const stats = [
    {
      title: 'Total Bank Balance',
      value: `${totalBank.toFixed(2)}`,
      icon: <FaUniversity />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${transactions.length} transactions`,
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Average Transaction',
      value: `${avgTransaction.toFixed(2)}`,
      icon: '📊',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Per transaction',
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Transactions',
      value: transactions.length,
      icon: '📝',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Total count',
      badgeVariant: 'gray' as const,
    },
  ];

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (t: any) => format(new Date(t.date), 'dd MMM yyyy'),
    },
    {
      key: 'receivedFrom',
      label: 'Received From',
      render: (t: any) => <span className="font-medium">{t.receivedFrom}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (t: any) => (
        <span className="font-semibold text-green-600">
          {(t.amount || 0).toFixed(2)}
        </span>
      ),
    },
    { key: 'note', label: 'Note', render: (t: any) => t.note || '-' },
    {
      key: 'actions',
      label: 'Actions',
      render: (t: any) => (
        <Button variant="outline" size="sm" onClick={() => handleDelete(t.id)}>
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
            <FaUniversity className="text-2xl text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bank Transactions
              </h1>
              <p className="text-sm text-gray-600">Manage bank transfers</p>
            </div>
          </div>
        </div>

        <BalanceStats stats={stats} />

        <div className="mb-6">
          <Link href="/cash">
            <Button variant="primary" className="w-full md:w-auto">
              + Add New Transaction
            </Button>
          </Link>
        </div>

        <Card title="Transaction History">
          <Table
            columns={columns}
            data={transactions}
            emptyMessage="No transactions yet"
          />
        </Card>
      </div>
    </Container>
  );
}
