import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} SMS Billing Calculator. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
