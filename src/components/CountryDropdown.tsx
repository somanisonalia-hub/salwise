'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Country {
  code: string;
  name: string;
  flag: string;
  slug: string;
  currency: string;
  description: string;
}

const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    slug: 'salary-after-tax-usa',
    currency: 'USD',
    description: 'Federal & state income tax calculations'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    slug: 'salary-after-tax-uk',
    currency: 'GBP',
    description: 'PAYE tax & National Insurance'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    slug: 'canada-salary-calculator',
    currency: 'CAD',
    description: 'Federal & provincial tax calculations'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    slug: 'australia-salary-calculator',
    currency: 'AUD',
    description: 'Income tax & superannuation'
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    slug: 'salary-after-tax-ireland',
    currency: 'EUR',
    description: 'Income tax & USC calculations'
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    slug: 'india-salary-calculator',
    currency: 'INR',
    description: 'Indian income tax slabs'
  }
];

export default function CountryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg"
      >
        <span className="font-medium">🌍 Countries</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute z-20 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">Country Calculators</h3>
              <p className="text-sm text-gray-600 mt-1">Localized tax calculations by country</p>
            </div>

            {/* Country Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {countries.map((country) => (
                  <Link
                    key={country.code}
                    href={`/${country.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {country.flag}
                      </div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {country.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {country.currency}
                      </div>
                      <div className="text-xs text-green-600 mt-2 font-medium group-hover:text-green-700">
                        Calculate →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  More countries coming soon!
                </div>
                <Link
                  href="/salary-calculator"
                  onClick={() => setIsOpen(false)}
                  className="inline-block mt-2 text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Use Global Calculator →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

