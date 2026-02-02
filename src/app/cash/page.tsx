'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import { addCashTransaction } from '@/lib/redux/features/cash/cashSlice';
import { addBkashTransaction } from '@/lib/redux/features/bkash/bkashSlice';
import { addLoan } from '@/lib/redux/features/loan/loanSlice';
import { addBankTransaction } from '@/lib/redux/features/bank/bankSlice';
import toast from 'react-hot-toast';

interface FormData {
  type: 'cash' | 'bkash' | 'loan' | 'bank';
  date: string;
  receivedFrom: string;
  amount: string;
  note: string;
}

export default function CashPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    type: 'cash',
    date: new Date().toISOString().split('T')[0],
    receivedFrom: '',
    amount: '',
    note: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);

    if (!formData.receivedFrom || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      switch (formData.type) {
        case 'cash':
          dispatch(
            addCashTransaction({
              date: formData.date,
              receivedFrom: formData.receivedFrom,
              amount,
              note: formData.note,
            }),
          );
          toast.success('Cash transaction added successfully');
          break;

        case 'bkash':
          dispatch(
            addBkashTransaction({
              date: formData.date,
              receivedFrom: formData.receivedFrom,
              amount,
              note: formData.note,
            }),
          );
          toast.success('bKash transaction added successfully');
          break;

        case 'loan':
          dispatch(
            addLoan({
              date: formData.date,
              receivedFrom: formData.receivedFrom,
              amount,
              note: formData.note,
            }),
          );
          toast.success('Loan added successfully');
          break;

        case 'bank':
          dispatch(
            addBankTransaction({
              date: formData.date,
              receivedFrom: formData.receivedFrom,
              amount,
              note: formData.note,
            })
          );
          toast.success('Bank transaction added successfully');
          break;

        default:
          toast.error('Invalid transaction type');
      }

      // Reset form
      setFormData({
        type: 'cash',
        date: new Date().toISOString().split('T')[0],
        receivedFrom: '',
        amount: '',
        note: '',
      });
    } catch (error) {
      toast.error('Failed to add transaction');
      console.error(error);
    }
  };

  const getTypeInfo = () => {
    const info: Record<string, { label: string; color: string; icon: string }> =
      {
        cash: {
          label: 'Cash in Hand',
          color: 'text-green-600',
          icon: '',
        },
        bkash: {
          label: 'bKash Mobile Money',
          color: 'text-blue-600',
          icon: '',
        },
        loan: {
          label: 'Loan',
          color: 'text-amber-600',
          icon: '',
        },
        bank: {
          label: 'Bank Transfer',
          color: 'text-purple-600',
          icon: '',
        },
      };
    return info[formData.type] || info.cash;
  };

  const typeInfo = getTypeInfo();

  return (
    <Container>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Cash Transaction
          </h1>
          <p className="text-gray-600 mt-2">
            Record income from any source - cash, bKash, loans, or bank
            transfers
          </p>
        </div>

        {/* Main Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Transaction Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'cash', label: 'Cash', icon: '' },
                  { value: 'bkash', label: 'bKash', icon: '' },
                  { value: 'loan', label: 'Loan', icon: '' },
                  { value: 'bank', label: 'Bank', icon: '' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: type.value as FormData['type'],
                      })
                    }
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-center font-medium ${
                      formData.type === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Type Info */}
            <div
              className={`p-4 rounded-lg bg-opacity-10 border-l-4 ${typeInfo.color.replace(
                'text-',
                'border-',
              )}`}
            >
              <p className={`${typeInfo.color} font-semibold`}>
                {typeInfo.icon} {typeInfo.label}
              </p>
            </div>

            {/* Date Field */}
            <DatePicker
              name="date"
              label="Date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            {/* Received From Field */}
            <Input
              type="text"
              name="receivedFrom"
              label={
                formData.type === 'loan'
                  ? 'Loan From'
                  : 'Received From / Source'
              }
              value={formData.receivedFrom}
              onChange={handleChange}
              placeholder={
                formData.type === 'loan'
                  ? 'Enter lender name'
                  : 'Enter source or person name'
              }
              required
            />

            {/* Amount Field */}
            <Input
              type="number"
              name="amount"
              label="Amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              min="0"
              step="0.01"
            />

            {/* Note Field */}
            <Input
              type="text"
              name="note"
              label="Note (Optional)"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add any additional details..."
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                Add{' '}
                {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}{' '}
                Transaction
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    type: 'cash',
                    date: new Date().toISOString().split('T')[0],
                    receivedFrom: '',
                    amount: '',
                    note: '',
                  })
                }
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
