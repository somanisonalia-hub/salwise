'use client';

import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/how-salary-calculators-work.json';

export default function HowSalaryCalculatorsWorkPage() {
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
              <p className="text-lg sm:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
                {content.intro.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
                {content.intro.paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How Salary Calculations Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.calculationSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-600">{step.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax Systems */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Tax Systems Around the World</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.taxSystems.map((system, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h3>
                  <p className="text-gray-700 mb-3">{system.description}</p>
                  <p className="text-sm text-blue-600 font-medium mb-2">{system.countries}</p>
                  <p className="text-sm text-gray-600 italic">{system.example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Deductions */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Common Deductions & Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.commonDeductions.map((deduction, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{deduction.name}</h3>
                  <p className="text-gray-700 mb-3">{deduction.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Calculation:</strong> {deduction.calculation}</p>
                    <p className="text-sm"><strong>Variability:</strong> {deduction.variability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accuracy Factors */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Factors Affecting Calculation Accuracy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.accuracyFactors.map((factor, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{factor.factor}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                    factor.impact === 'High' ? 'bg-red-100 text-red-800' :
                    factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {factor.impact} Impact
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Best Practices for Accurate Calculations</h2>
            <div className="space-y-6">
              {content.bestPractices.map((practice, index) => (
                <div key={index} className="flex items-start bg-gray-50 p-6 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{practice.practice}</h3>
                    <p className="text-gray-700">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mx-4 sm:mx-6 lg:mx-8 my-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">{content.limitations.title}</h2>
            <ul className="space-y-2">
              {content.limitations.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span className="text-yellow-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Calculate Your Salary?</h2>
            <p className="text-lg mb-6 text-blue-100">Try our free salary calculators to see how these calculations work in practice</p>
            <Link
              href="/en/salary-calculator"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Try Salary Calculator
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
