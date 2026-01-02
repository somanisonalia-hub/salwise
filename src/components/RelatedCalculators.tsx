'use client';

import React from 'react';
import Link from 'next/link';

interface RelatedCalculator {
  title: string;
  slug: string;
  description: string;
  anchorText?: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
  title?: string;
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({
  calculators,
  title = "Related Calculators"
}) => {
  return (
    <div className="bg-white border border-gray-200 p-4 mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {calculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={`/${calculator.slug}`}
            className="block p-3 border border-gray-200"
          >
            <h4 className="font-semibold text-blue-600 mb-1">
              {calculator.anchorText || calculator.title}
            </h4>
            <p className="text-sm text-gray-600">{calculator.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
