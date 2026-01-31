import { ReactNode } from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container';

export default function SMSLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container className="pb-0">
        <nav className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col sm:flex-row">
            <Link
              href="/SMS/masking"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Masking SMS
            </Link>
            <Link
              href="/SMS/non-masking"
              className="flex-1 px-6 py-4 text-center font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Non-Masking SMS
            </Link>
          </div>
        </nav>
      </Container>
      {children}
    </>
  );
}
