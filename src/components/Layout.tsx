'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Extract locale from pathname (e.g., '/en/salary-calculator' -> 'en')
  const locale = pathname.startsWith('/en') ? 'en' :
                 pathname.startsWith('/es') ? 'es' :
                 pathname.startsWith('/fr') ? 'fr' : 'en';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
                SalaryWise.io
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href={`/${locale}/salary-calculator`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Calculators
              </Link>
              <Link href={`/${locale}/country`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                By Country
              </Link>
              <Link href={`/${locale}/industry`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                By Industry
              </Link>
              <Link href={`/${locale}/guides`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Guides
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Calculators</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/salary-calculator`} className="text-gray-600 hover:text-blue-600">Salary Calculator</Link></li>
                <li><Link href={`/${locale}/hourly-to-salary`} className="text-gray-600 hover:text-blue-600">Hourly to Salary</Link></li>
                <li><Link href={`/${locale}/gross-to-net`} className="text-gray-600 hover:text-blue-600">Gross to Net</Link></li>
                <li><Link href={`/${locale}/take-home-pay`} className="text-gray-600 hover:text-blue-600">Take Home Pay</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Country</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/salary-after-tax-usa`} className="text-gray-600 hover:text-blue-600">USA</Link></li>
                <li><Link href={`/${locale}/salary-after-tax-uk`} className="text-gray-600 hover:text-blue-600">UK</Link></li>
                <li><Link href={`/${locale}/salary-calculator-canada`} className="text-gray-600 hover:text-blue-600">Canada</Link></li>
                <li><Link href={`/${locale}/salary-calculator-australia`} className="text-gray-600 hover:text-blue-600">Australia</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Industry</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/salary-calculator-it-tech`} className="text-gray-600 hover:text-blue-600">IT & Tech</Link></li>
                <li><Link href={`/${locale}/salary-calculator-healthcare`} className="text-gray-600 hover:text-blue-600">Healthcare</Link></li>
                <li><Link href={`/${locale}/salary-calculator-finance-banking`} className="text-gray-600 hover:text-blue-600">Finance</Link></li>
                <li><Link href={`/${locale}/salary-calculator-engineering`} className="text-gray-600 hover:text-blue-600">Engineering</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guides</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/understanding-gross-vs-net-salary`} className="text-gray-600 hover:text-blue-600">Gross vs Net</Link></li>
                <li><Link href={`/${locale}/salary-negotiation-tips`} className="text-gray-600 hover:text-blue-600">Salary Negotiation</Link></li>
                <li><Link href={`/${locale}/taxes-explained-by-country`} className="text-gray-600 hover:text-blue-600">Taxes by Country</Link></li>
                <li><Link href={`/${locale}/salary-trends-2026-global`} className="text-gray-600 hover:text-blue-600">2026 Trends</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 SalaryWise.io. Free salary calculators for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
