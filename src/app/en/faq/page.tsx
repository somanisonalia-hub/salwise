'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import content from '../../../locales/en/faq.json';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={content.canonical} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/en" className="text-2xl font-bold text-blue-600">
                  SalaryWise.io
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/en/salary-calculator" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Calculators
                </Link>
                <Link href="/en/country" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  By Country
                </Link>
                <Link href="/en/industry" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  By Industry
                </Link>
                <Link href="/en/guides" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Guides
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {content.h1}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                Find answers to the most common questions about our salary calculators
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {content.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openItems[`${categoryIndex}-${faqIndex}`];
                  return (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        onClick={() => toggleItem(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Prompt */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{content.contactPrompt.title}</h2>
            <p className="text-lg mb-6 text-blue-100">{content.contactPrompt.description}</p>
            <Link
              href={`/en${content.contactPrompt.href}`}
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {content.contactPrompt.cta}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Calculators</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/salary-calculator" className="text-gray-600 hover:text-blue-600">Salary Calculator</Link></li>
                  <li><Link href="/en/hourly-to-salary-calculator" className="text-gray-600 hover:text-blue-600">Hourly to Salary</Link></li>
                  <li><Link href="/en/gross-to-net-salary" className="text-gray-600 hover:text-blue-600">Gross to Net</Link></li>
                  <li><Link href="/en/take-home-pay-calculator" className="text-gray-600 hover:text-blue-600">Take Home Pay</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/en/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                  <li><Link href="/en/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                  <li><Link href="/en/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/cookies" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
                  <li><Link href="/en/disclaimer" className="text-gray-600 hover:text-blue-600">Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
                  <li><Link href="/en/salary-guide" className="text-gray-600 hover:text-blue-600">Salary Guide</Link></li>
                  <li><Link href="/en/how-salary-calculators-work" className="text-gray-600 hover:text-blue-600">Calculator Guide</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with the latest salary trends and calculator updates.
                </p>
                <div className="flex space-x-4">
                  <span className="text-gray-400">Coming Soon</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">© 2026 SalaryWise.io. Free salary calculators for everyone.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
