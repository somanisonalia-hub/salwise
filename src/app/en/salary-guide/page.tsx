'use client';

import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/salary-guide.json';

export default function SalaryGuidePage() {
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

        {/* Salary Components */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Components of Total Compensation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.salaryComponents.map((component, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{component.component}</h3>
                  <p className="text-gray-700 mb-3">{component.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-600"><strong>Importance:</strong> {component.importance}</p>
                    <p className="text-sm text-green-600"><strong>Tip:</strong> {component.negotiationTip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Negotiation Strategies */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Salary Negotiation Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.negotiationStrategies.map((strategy, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{strategy.strategy}</h3>
                  <p className="text-gray-700 mb-3">{strategy.description}</p>
                  <div className="space-y-2 text-sm">
                    {strategy.tools && <p><strong>Tools:</strong> {strategy.tools}</p>}
                    {strategy.example && <p><strong>Example:</strong> {strategy.example}</p>}
                    {strategy.benefit && <p><strong>Benefit:</strong> {strategy.benefit}</p>}
                    {strategy.timing && <p><strong>Timing:</strong> {strategy.timing}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Trends 2025 */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Salary Trends for 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.salaryTrends2025.map((trend, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.trend}</h3>
                  <p className="text-gray-700 mb-3">{trend.description}</p>
                  <div className="space-y-1 text-sm">
                    {trend.reason && <p><strong>Reason:</strong> {trend.reason}</p>}
                    {trend.industries && <p><strong>Industries:</strong> {trend.industries}</p>}
                    {trend.impact && <p><strong>Impact:</strong> {trend.impact}</p>}
                    {trend.benefit && <p><strong>Benefit:</strong> {trend.benefit}</p>}
                    <p className="text-blue-600 mt-2"><strong>Advice:</strong> {trend.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Industry-Specific Salary Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.industryInsights.map((industry, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.industry}</h3>
                  <p className="text-green-600 font-medium mb-2">{industry.growth}</p>
                  <p className="text-sm text-gray-700 mb-2">{industry.key}</p>
                  <p className="text-sm text-blue-600"><strong>Focus:</strong> {industry.negotiation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Common Salary Negotiation Mistakes</h2>
            <div className="space-y-6">
              {content.commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">{mistake.mistake}</h3>
                  <p className="text-red-700 mb-2"><strong>Consequence:</strong> {mistake.consequence}</p>
                  <p className="text-green-700"><strong>How to Fix:</strong> {mistake.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timing Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{content.timing.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.timing.scenarios.map((scenario, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.scenario}</h3>
                  <p className="text-blue-600 font-medium mb-2">{scenario.timing}</p>
                  <p className="text-sm text-gray-600">{scenario.preparation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">{content.calculators.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.calculators.tools.map((tool, index) => (
                <div key={index} className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <Link
                    href={`/en${tool.href}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Try Calculator
                  </Link>
                </div>
              ))}
            </div>
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
