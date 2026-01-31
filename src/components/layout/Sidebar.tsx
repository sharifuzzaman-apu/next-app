'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  available: boolean;
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: '🏠',
    available: true,
  },
  {
    name: 'Non-Masking SMS',
    href: '/non-masking',
    icon: '📱',
    available: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-sidebar bg-gradient-to-b from-blue-700 to-blue-900 text-white min-h-screen fixed left-0 top-0 shadow-2xl">
      <div className="p-6">
        <Link href="/" className="block mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            SMS Calculator
          </h1>
          <p className="text-xs text-blue-200 mt-1">Billing & Analytics</p>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isAvailable = item.available;

            return (
              <Link
                key={item.href}
                href={isAvailable ? item.href : '#'}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'bg-white text-blue-900 shadow-lg font-semibold'
                      : isAvailable
                        ? 'hover:bg-blue-600 hover:shadow-md hover:translate-x-1'
                        : 'opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={(e) => !isAvailable && e.preventDefault()}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <span className="block">{item.name}</span>
                  {!isAvailable && (
                    <span className="text-xs text-blue-300">Coming Soon</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
