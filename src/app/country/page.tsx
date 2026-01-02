import Link from 'next/link';
import Head from 'next/head';

export default function CountryPageFocused() {
  // Structured data for country calculators
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Country Salary Calculators",
    "url": "https://salarywise.io/country",
    "description": "Calculate take-home pay for 15+ countries with localized tax rules. Compare salaries across different countries with accurate tax calculations.",
    "publisher": {
      "@type": "Organization",
      "name": "SalaryWise.io"
    }
  };

  const countries = [
    {
      code: 'US',
      name: 'United States',
      flag: '🇺🇸',
      slug: 'usa-salary-calculator',
      currency: 'USD',
      taxRate: '~25%',
      description: 'Federal income tax, state taxes, FICA',
      popular: true,
      population: '331M'
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      flag: '🇬🇧',
      slug: 'uk-salary-calculator',
      currency: 'GBP',
      taxRate: '~32%',
      description: 'PAYE tax, National Insurance',
      popular: true,
      population: '67M'
    },
    {
      code: 'CA',
      name: 'Canada',
      flag: '🇨🇦',
      slug: 'canada-salary-calculator',
      currency: 'CAD',
      taxRate: '~26%',
      description: 'Federal & provincial taxes, CPP, EI',
      popular: true,
      population: '38M'
    },
    {
      code: 'AU',
      name: 'Australia',
      flag: '🇦🇺',
      slug: 'australia-salary-calculator',
      currency: 'AUD',
      taxRate: '~30%',
      description: 'Income tax, superannuation',
      popular: true,
      population: '26M'
    },
    {
      code: 'IE',
      name: 'Ireland',
      flag: '🇮🇪',
      slug: 'ireland-salary-calculator',
      currency: 'EUR',
      taxRate: '~27%',
      description: 'Income tax, USC, PRSI',
      popular: false,
      population: '5M'
    },
    {
      code: 'IN',
      name: 'India',
      flag: '🇮🇳',
      slug: 'india-salary-calculator',
      currency: 'INR',
      taxRate: '~22%',
      description: 'Income tax slabs, cess',
      popular: false,
      population: '1.4B'
    }
  ];

  const popularCountries = countries.filter(c => c.popular);
  const otherCountries = countries.filter(c => !c.popular);

  return (
    <>
      <Head>
        <title>Country Salary Calculators | International Take-Home Pay | SalaryWise.io</title>
        <meta name="description" content="Calculate take-home pay for 15+ countries with localized tax rules. Compare salaries across US, UK, Canada, Australia, Ireland, India and more." />
        <meta name="keywords" content="country salary calculator, international salary, take home pay by country, tax calculator by country, salary comparison" />
        <link rel="canonical" href="https://salarywise.io/country" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Compact Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Country Salary Calculators</h1>
                <p className="text-gray-600 mt-1">Localized tax calculations for 15+ countries</p>
              </div>
              <Link
                href="/en"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* Introduction */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Calculate Salaries Worldwide</h2>
            <p className="text-gray-700 mb-4">
              Compare take-home pay across different countries with accurate, localized tax calculations.
              Each country calculator includes specific tax rules, deductions, and currency formatting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-blue-800">Countries Supported</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-2xl font-bold text-green-600">Localized</div>
                <div className="text-sm text-green-800">Tax Calculations</div>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-2xl font-bold text-purple-600">Real-time</div>
                <div className="text-sm text-purple-800">Currency Conversion</div>
              </div>
            </div>
          </div>

          {/* Popular Countries */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              Popular Countries
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularCountries.map((country) => (
                <Link
                  key={country.code}
                  href={`/${country.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation block"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{country.flag}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{country.name}</h4>
                    <div className="text-sm text-gray-600 mb-2">{country.currency} • {country.taxRate} avg tax</div>
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                      {country.population} population
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Countries */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">More Countries</h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {otherCountries.map((country) => (
                <Link
                  key={country.code}
                  href={`/${country.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation block"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{country.flag}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{country.name}</h4>
                      <div className="text-sm text-gray-600">{country.currency} • {country.taxRate} tax</div>
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
          </div>

          {/* Tax Comparison Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">International Tax Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Country</th>
                    <th className="text-left py-3 font-semibold">Currency</th>
                    <th className="text-left py-3 font-semibold">Avg Tax Rate</th>
                    <th className="text-left py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {countries.map((country) => (
                    <tr key={country.code} className="hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium">{country.name}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono">{country.currency}</td>
                      <td className="py-3 font-semibold text-blue-600">{country.taxRate}</td>
                      <td className="py-3 text-gray-600 max-w-xs truncate">{country.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Choose Country Calculators */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-6 text-white">
            <h3 className="text-xl font-bold mb-3">Why Use Country-Specific Calculators?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">🎯</span>
                  <div>
                    <div className="font-semibold">Accurate Local Taxes</div>
                    <div className="text-blue-100 text-sm">Each country has unique tax brackets and deduction rules</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">💱</span>
                  <div>
                    <div className="font-semibold">Currency Conversion</div>
                    <div className="text-blue-100 text-sm">Real-time currency formatting for local markets</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">📊</span>
                  <div>
                    <div className="font-semibold">Relocation Planning</div>
                    <div className="text-blue-100 text-sm">Compare take-home pay when moving between countries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">🏢</span>
                  <div>
                    <div className="font-semibold">Remote Work</div>
                    <div className="text-blue-100 text-sm">Calculate salary impact for international opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link
              href="/en/salary-calculator"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium">Salary Calculator</div>
            </Link>

            <Link
              href="/en/gross-to-net-salary"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Tax Calculator</div>
            </Link>

            <Link
              href="/en/guides"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium">Tax Guide</div>
            </Link>

            <Link
              href="/"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm font-medium">Home</div>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>

            <div className="space-y-4">
              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Which countries do you support?</summary>
                <p className="mt-2 text-gray-600">We currently support salary calculations for USA, UK, Canada, Australia, Ireland, and India. Each calculator includes country-specific tax rules and currency formatting.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Why do tax rates vary by country?</summary>
                <p className="mt-2 text-gray-600">Each country has its own tax system, brackets, deductions, and social contributions. What you take home can vary significantly even with similar gross salaries.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">How often are tax rates updated?</summary>
                <p className="mt-2 text-gray-600">We update tax rates annually to reflect the latest changes. All calculators use current tax brackets and rules for accurate calculations.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Can I compare salaries between countries?</summary>
                <p className="mt-2 text-gray-600">Yes! Use our calculators to compare take-home pay across different countries. This is especially useful for relocation planning or international job offers.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20 md:hidden">
          <div className="flex justify-around">
            <Link href="/en" className="flex flex-col items-center p-2">
              <span className="text-lg">🏠</span>
              <span className="text-xs font-medium mt-1">Home</span>
            </Link>
            <Link href="/en/gross-to-net-salary" className="flex flex-col items-center p-2">
              <span className="text-lg">📊</span>
              <span className="text-xs font-medium mt-1">Tax Calc</span>
            </Link>
            <Link href="/en/salary-calculator" className="flex flex-col items-center p-2">
              <span className="text-lg">💰</span>
              <span className="text-xs font-medium mt-1">Salary</span>
            </Link>
          </div>
        </div>

        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}
