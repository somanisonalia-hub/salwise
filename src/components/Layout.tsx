'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Extract locale from pathname (e.g., '/en/salary-calculator' -> 'en')
  const locale = pathname.startsWith('/en') ? 'en' :
                 pathname.startsWith('/es') ? 'es' :
                 pathname.startsWith('/fr') ? 'fr' : 'en';

  // Show/hide back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💰</span>
                </div>
                <span className="text-2xl font-bold text-blue-600 hidden sm:block">
                  SalaryWise.io
                </span>
                <span className="text-xl font-bold text-blue-600 sm:hidden">
                  SalaryWise
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href={`/${locale}/salary-calculator`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Compare Salaries
              </Link>
              <Link href={`/${locale}/country`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Countries
              </Link>
              <Link href={`/${locale}/guides`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Guides
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                <Link
                  href={`/${locale}`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href={`/${locale}/salary-calculator`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Compare Salaries
                </Link>
                <Link
                  href={`/${locale}/country`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Countries
                </Link>
                <Link
                  href={`/${locale}/guides`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Guides
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💰</span>
                </div>
                <span className="text-xl font-bold">SalaryWise.io</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Professional salary calculators with accurate 2026 tax data for USA, UK, and Ireland. Free, fast, and reliable.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/salarywiseio" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/salarywise" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Calculators */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculators</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/salary-calculator`} className="text-gray-300 hover:text-white transition-colors">Global Salary</Link></li>
                <li><Link href={`/${locale}/gross-to-net-salary`} className="text-gray-300 hover:text-white transition-colors">Gross to Net</Link></li>
                <li><Link href={`/${locale}/take-home-pay-calculator`} className="text-gray-300 hover:text-white transition-colors">Take-Home Pay</Link></li>
                <li><Link href={`/${locale}/salary-after-tax-calculator`} className="text-gray-300 hover:text-white transition-colors">Salary After Tax</Link></li>
              </ul>
            </div>

            {/* Countries & Regions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">By Country</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/country`} className="text-gray-300 hover:text-white transition-colors">🌍 Countries Hub</Link></li>
                <li><Link href={`/${locale}/country/usa`} className="text-gray-300 hover:text-white transition-colors">🇺🇸 USA</Link></li>
                <li><Link href={`/${locale}/country/uk`} className="text-gray-300 hover:text-white transition-colors">🇬🇧 UK</Link></li>
                <li><Link href={`/${locale}/country/ireland`} className="text-gray-300 hover:text-white transition-colors">🇮🇪 Ireland</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/guides`} className="text-gray-300 hover:text-white transition-colors">📚 Guides</Link></li>
                <li><Link href={`/${locale}/industry`} className="text-gray-300 hover:text-white transition-colors">🏭 By Industry</Link></li>
                <li><Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">📞 Contact</Link></li>
                <li><Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href={`/${locale}/sitemap`} className="text-gray-300 hover:text-white transition-colors">🗺️ Sitemap</Link></li>
              </ul>
            </div>
          </div>

          {/* Government Resources */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <h3 className="text-lg font-semibold mb-4">Official Government Resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <a href="https://www.irs.gov" className="text-gray-300 hover:text-white transition-colors text-sm">
                🇺🇸 IRS (USA)
              </a>
              <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" className="text-gray-300 hover:text-white transition-colors text-sm">
                🇬🇧 HMRC (UK)
              </a>
              <a href="https://www.revenue.ie" className="text-gray-300 hover:text-white transition-colors text-sm">
                🇮🇪 Revenue (Ireland)
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm mb-4 md:mb-0">
                © 2026 SalaryWise.io. Free salary calculators for everyone.
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href={`/${locale}/privacy-policy`} className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href={`/${locale}/terms-of-service`} className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href={`/${locale}/disclaimer`} className="text-gray-300 hover:text-white transition-colors">
                  Disclaimer
                </Link>
                <Link href={`/${locale}/cookies`} className="text-gray-300 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center text-gray-400 text-xs space-y-2">
              <div>⚠️ Calculators are for informational purposes only. See our <Link href={`/${locale}/disclaimer`} className="text-blue-400 hover:text-blue-300 underline">Disclaimer</Link> for details.</div>
              <div>SalaryWise provides estimated take-home pay based on publicly available tax structures. Results are for guidance only and not financial advice.</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};
