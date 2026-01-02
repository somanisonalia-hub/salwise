'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Calculator {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
}

const calculators: Calculator[] = [
  {
    id: 'salary',
    name: 'Salary Calculator',
    slug: 'salary-calculator',
    description: 'Convert hourly to annual salary',
    icon: '💰',
    category: 'Basic'
  },
  {
    id: 'gross-net',
    name: 'Gross to Net Calculator',
    slug: 'gross-to-net-salary',
    description: 'Find your take-home pay',
    icon: '📊',
    category: 'Basic'
  },
  {
    id: 'take-home',
    name: 'Take-Home Pay Calculator',
    slug: 'take-home-pay-calculator',
    description: 'Calculate your net paycheck',
    icon: '💵',
    category: 'Basic'
  },
  {
    id: 'hourly-salary',
    name: 'Hourly to Salary Calculator',
    slug: 'hourly-to-salary-calculator',
    description: 'Convert hourly wage to salary',
    icon: '⏰',
    category: 'Basic'
  },
  {
    id: 'bonus',
    name: 'Bonus Calculator',
    slug: 'bonus-calculator',
    description: 'Calculate bonus after taxes',
    icon: '🎁',
    category: 'Advanced'
  },
  {
    id: 'net-gross',
    name: 'Net to Gross Calculator',
    slug: 'net-to-gross',
    description: 'Find required gross salary',
    icon: '🔄',
    category: 'Advanced'
  },
  {
    id: 'overtime',
    name: 'Overtime Calculator',
    slug: 'overtime-pay',
    description: 'Calculate overtime pay rates',
    icon: '🕐',
    category: 'Advanced'
  }
];

const categories = ['All', 'Basic', 'Advanced'];

export default function CalculatorDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCalculators = selectedCategory === 'All'
    ? calculators
    : calculators.filter(calc => calc.category === selectedCategory);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
      >
        <span className="font-medium">🧮 Calculators</span>
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
              <h3 className="font-bold text-gray-900 text-lg">Choose a Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Select from our salary calculation tools</p>
            </div>

            {/* Category Tabs */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredCalculators.map((calculator) => (
                <Link
                  key={calculator.id}
                  href={`/${calculator.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{calculator.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{calculator.name}</div>
                      <div className="text-sm text-gray-600">{calculator.description}</div>
                      <div className="text-xs text-blue-600 mt-1">{calculator.category}</div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Link
                href="/understanding-gross-vs-net-salary"
                onClick={() => setIsOpen(false)}
                className="block text-center text-blue-600 hover:text-blue-800 font-medium"
              >
                📚 Learn More About Salary Calculations
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

