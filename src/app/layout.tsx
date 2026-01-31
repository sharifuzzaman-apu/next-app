import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { ToastProvider } from '@/components/ui/toast/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SMS Billing Calculator',
  description:
    'Calculate SMS billing and gross profit for non-masking services',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'SMS Billing Calculator',
    description:
      'Calculate SMS billing and gross profit for non-masking services',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}
      >
        <ToastProvider>
          <Sidebar />
          <div className="flex-1 ml-sidebar flex flex-col">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
