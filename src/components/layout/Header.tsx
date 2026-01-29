import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-600">
          SMS Billing Calculator
        </h1>
        <p className="text-gray-600 mt-1">
          Calculate SMS billing and gross profit for non-masking services
        </p>
      </div>
    </header>
  );
}
