'use client';

import React from 'react';
import Link from 'next/link';
import countriesData from '../data/countries.json';

export const CountrySelector: React.FC = () => {
  const countries = Object.values(countriesData);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate by Country</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/country/${country.slug}`}
            className="block p-3 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="font-medium text-blue-600">{country.title.replace('Salary Calculator', '')}</div>
            <div className="text-xs text-gray-500 mt-1">
              Avg: {country.currency} {country.averageSalary.toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
