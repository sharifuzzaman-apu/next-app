'use client';

import { useSelector, useDispatch } from 'react-redux';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import BalanceStats from '@/components/accounting/BalanceStats';
import Link from 'next/link';
import {
  addCashTransaction,
  deleteCashTransaction,
} from '@/lib/redux/features/cash/cashSlice';
import { RootState } from '@/lib/redux/store';
import { FaMoneyBillWave, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function MaskingCalculator() {
  const dispatch = useDispatch();
  const { transactions = [], totalCash = 0 } = useSelector(
    (state: RootState) => state.cash || {},
  );

  const incomeTransactions = transactions.filter((t) => t.type === 'income');

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch(deleteCashTransaction(id));
      toast.success('Transaction deleted');
    }
  };

  const avgTransaction =
    incomeTransactions.length > 0
      ? incomeTransactions.reduce((sum, t) => sum + t.amount, 0) /
        incomeTransactions.length
      : 0;

  const stats = [
    {
      title: 'Total Cash',
      value: `${totalCash.toFixed(2)}`,
      icon: <FaMoneyBillWave />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${incomeTransactions.length} transactions`,
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
      value: incomeTransactions.length,
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
            <FaMoneyBillWave className="text-2xl text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cash Transactions
              </h1>
              <p className="text-sm text-gray-600">Manage cash income</p>
            </div>
          </div>
        </div>

        <BalanceStats stats={stats} />

        <div className="mb-6">
          <Link href="/cash">
            <Button variant="success" className="w-full md:w-auto">
              + Add New Transaction
            </Button>
          </Link>
        </div>

        <Card title="Transaction History">
          <Table
            columns={columns}
            data={incomeTransactions}
            emptyMessage="No transactions yet"
          />
        </Card>
      </div>
    </Container>
  );
}
