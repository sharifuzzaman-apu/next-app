'use client';

import { useSelector, useDispatch } from 'react-redux';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import BalanceStats from '@/components/accounting/BalanceStats';
import Link from 'next/link';
import {
  addBkashTransaction,
  deleteBkashTransaction,
} from '@/lib/redux/features/bkash/bkashSlice';
import { RootState } from '@/lib/redux/store';
import { FaMobileAlt, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function MaskingCalculator() {
  const dispatch = useDispatch();
  const {
    transactions = [],
    totalBankAmount = 0,
    chargeRate = 1.85,
  } = useSelector((state: RootState) => state.bkash || {});

  const totalReceived = transactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0,
  );
  const totalCharge = transactions.reduce((sum, t) => sum + (t.charge || 0), 0);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch(deleteBkashTransaction(id));
      toast.success('Transaction deleted');
    }
  };

  const stats = [
    {
      title: 'Total Received',
      value: `${totalReceived.toFixed(2)}`,
      icon: <FaMobileAlt />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${transactions.length} transactions`,
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Total Charge',
      value: `${totalCharge.toFixed(2)}`,
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${chargeRate}% deducted`,
      badgeVariant: 'gray' as const,
    },
    {
      title: 'Bank Balance',
      value: `${totalBankAmount.toFixed(2)}`,
      icon: '🏦',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Final amount',
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
      label: 'Received',
      render: (t: any) => (
        <span className="font-medium">{(t.amount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'charge',
      label: 'Charge',
      render: (t: any) => (
        <span className="text-red-600">-{(t.charge || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'bankAmount',
      label: 'Bank Amount',
      render: (t: any) => (
        <span className="font-semibold text-green-600">
          {(t.bankAmount || 0).toFixed(2)}
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
            <FaMobileAlt className="text-2xl text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                bKash Transactions
              </h1>
              <p className="text-sm text-gray-600">Manage bKash income</p>
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
