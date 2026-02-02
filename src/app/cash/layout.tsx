import { ReactNode } from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';

export default function SMSLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container className="pb-0">
        <nav className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <Link
              href="/cash/Bank"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Cash in Bank
            </Link>

            <Link
              href="/cash/Bkash"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Cash in Bkash
            </Link>

            <Link
              href="/cash/Cash"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Cash in Cash
            </Link>

            <Link
              href="/cash/Loan"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Loan
            </Link>
          </div>
        </nav>
      </Container>
      {children}
    </>
  );
}
