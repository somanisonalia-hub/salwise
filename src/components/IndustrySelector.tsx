'use client';

import React from 'react';
import Link from 'next/link';
import industriesData from '../data/industries.json';

export const IndustrySelector: React.FC = () => {
  const industries = Object.values(industriesData);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate by Industry</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industry/${industry.slug}`}
            className="block p-3 text-center border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="font-medium text-blue-600">{industry.title.replace('Salary Calculator', '')}</div>
            <div className="text-xs text-gray-500 mt-1">
              Avg: ${industry.averageSalary.toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
