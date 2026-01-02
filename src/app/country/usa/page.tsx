import Link from 'next/link';
import Head from 'next/head';

export default function USAFocused() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "USA Salary Calculator",
    "url": "https://salarywise.io/country/usa",
    "applicationCategory": "Calculator",
    "description": "Calculate take-home pay in the USA including federal income tax, state taxes, Social Security, and Medicare. Accurate US tax calculations.",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const states = [
    { name: "California", rate: "13.3%", abbr: "CA" },
    { name: "New York", rate: "8.82%", abbr: "NY" },
    { name: "Texas", rate: "0%", abbr: "TX" },
    { name: "Florida", rate: "0%", abbr: "FL" },
    { name: "Illinois", rate: "4.95%", abbr: "IL" },
    { name: "Pennsylvania", rate: "3.07%", abbr: "PA" },
    { name: "Ohio", rate: "0%", abbr: "OH" },
    { name: "Georgia", rate: "5.75%", abbr: "GA" }
  ];

  return (
    <>
      <Head>
        <title>USA Salary Calculator | US Take-Home Pay Calculator | SalaryWise.io</title>
        <meta name="description" content="Calculate take-home pay in the USA. Includes federal income tax, state taxes, Social Security, Medicare. Free US salary calculator with accurate 2024 tax rates." />
        <meta name="keywords" content="USA salary calculator, US take home pay, federal tax calculator, state income tax, US payroll calculator" />
        <link rel="canonical" href="https://salarywise.io/country/usa" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Compact Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇺🇸</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">USA Salary Calculator</h1>
                  <p className="text-gray-600 mt-1">Calculate take-home pay with US taxes</p>
                </div>
              </div>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Calculator Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🇺🇸 US Take-Home Pay Calculator</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Gross Salary ($)
                  </label>
                  <input
                    type="number"
                    placeholder="75000"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filing Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option>Single</option>
                    <option>Married Filing Jointly</option>
                    <option>Married Filing Separately</option>
                    <option>Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State Income Tax
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="0">No state tax (TX, FL, etc.)</option>
                    <option value="0.133">California (13.3%)</option>
                    <option value="0.0882">New York (8.82%)</option>
                    <option value="0.0495">Illinois (4.95%)</option>
                    <option value="0.0575">Georgia (5.75%)</option>
                    <option value="0.0307">Pennsylvania (3.07%)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="standardDeduction" defaultChecked className="rounded" />
                  <label htmlFor="standardDeduction" className="text-sm text-gray-700">
                    Use 2024 Standard Deduction ($14,600 single)
                  </label>
                </div>

                <button className="w-full bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700 transition-colors">
                  Calculate US Take-Home Pay
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your US Take-Home Pay</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Gross Annual Salary</div>
                  <div className="text-2xl font-bold text-gray-900">$75,000</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Standard Deduction</span>
                    <span className="text-green-600">-$14,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income</span>
                    <span>$60,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Federal Income Tax (22%)</span>
                    <span className="text-red-600">-$13,288</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Security (6.2%)</span>
                    <span className="text-red-600">-$4,650</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare (1.45%)</span>
                    <span className="text-red-600">-$1,088</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Net Take-Home Pay</span>
                    <span className="font-bold text-green-600">$45,374</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                  <div className="text-sm text-blue-600 mb-1">Monthly Take-Home Pay</div>
                  <div className="text-xl font-bold text-blue-800">$3,781</div>
                  <div className="text-xs text-blue-600 mt-1">After all US federal & state taxes</div>
                </div>
              </div>
            </div>
          </div>

          {/* State Tax Comparison */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">State Income Tax Comparison</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {states.map((state) => (
                <div key={state.abbr} className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{state.name}</div>
                  <div className="text-lg font-bold text-blue-600">{state.rate}</div>
                  <div className="text-xs text-gray-600">tax rate</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 text-sm text-center">
                💡 <strong>9 states have no income tax:</strong> Texas, Florida, Nevada, Washington, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire
              </p>
            </div>
          </div>

          {/* Federal Tax Brackets 2024 */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">2024 US Federal Tax Brackets (Single Filer)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold">Income Range</th>
                    <th className="text-left py-2 font-semibold">Tax Rate</th>
                    <th className="text-left py-2 font-semibold">Tax Owed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2">$0 - $11,600</td>
                    <td className="py-2">10%</td>
                    <td className="py-2">$0 - $1,160</td>
                  </tr>
                  <tr>
                    <td className="py-2">$11,601 - $47,150</td>
                    <td className="py-2">12%</td>
                    <td className="py-2">$1,161 - $5,426</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-2">$47,151 - $100,525</td>
                    <td className="py-2 font-semibold text-blue-600">22%</td>
                    <td className="py-2">$5,427 - $18,715</td>
                  </tr>
                  <tr>
                    <td className="py-2">$100,526 - $191,950</td>
                    <td className="py-2">24%</td>
                    <td className="py-2">$18,716 - $39,826</td>
                  </tr>
                  <tr>
                    <td className="py-2">$191,951+</td>
                    <td className="py-2">32%</td>
                    <td className="py-2">$39,827+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/gross-to-net"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Gross to Net</div>
            </Link>

            <Link
              href="/take-home-pay"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">💵</div>
              <div className="text-sm font-medium">Take-Home Pay</div>
            </Link>

            <Link
              href="/country/uk"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">🇬🇧</div>
              <div className="text-sm font-medium">UK Calculator</div>
            </Link>

            <Link
              href="/guides/gross-vs-net"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium">Tax Guide</div>
            </Link>
          </div>

          {/* US-Specific Content */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding US Tax System</h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-3">
                The US tax system includes <strong>federal income tax</strong> (bracketed rates), <strong>FICA taxes</strong> (Social Security + Medicare),
                and optional <strong>state income taxes</strong>. Understanding these components helps you maximize your take-home pay.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Federal Income Tax</h4>
                  <p className="text-sm text-red-800">Progressive tax brackets from 10% to 37%. Based on taxable income after deductions.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">FICA Taxes (7.65%)</h4>
                  <p className="text-sm text-blue-800">Social Security (6.2%) + Medicare (1.45%). Funds retirement and healthcare programs.</p>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">State Income Tax</h4>
                  <p className="text-sm text-green-800">Varies by state from 0% (TX, FL) to 13.3% (CA). Additional tax on top of federal.</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
                <p className="text-yellow-800">
                  <strong>💡 Pro Tip:</strong> Use the standard deduction ($14,600 for single filers in 2024) to reduce your taxable income.
                  Consider contributing to pre-tax retirement accounts to lower your tax burden.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">US Tax FAQs</h3>

            <div className="space-y-4">
              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">What is the standard deduction for 2024?</summary>
                <p className="mt-2 text-gray-600">$14,600 for single filers, $29,200 for married filing jointly. This reduces your taxable income.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Do all states have income tax?</summary>
                <p className="mt-2 text-gray-600">No, 9 states have no state income tax: Texas, Florida, Nevada, Washington, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">What's the difference between gross and net pay?</summary>
                <p className="mt-2 text-gray-600">Gross pay is your total earnings before deductions. Net pay (take-home) is after federal, state, and FICA taxes are withheld.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20 md:hidden">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center p-2">
              <span className="text-lg">🏠</span>
              <span className="text-xs font-medium mt-1">Home</span>
            </Link>
            <Link href="/gross-to-net" className="flex flex-col items-center p-2">
              <span className="text-lg">📊</span>
              <span className="text-xs font-medium mt-1">Tax Calc</span>
            </Link>
            <Link href="/country/uk" className="flex flex-col items-center p-2">
              <span className="text-lg">🇬🇧</span>
              <span className="text-xs font-medium mt-1">UK</span>
            </Link>
          </div>
        </div>

        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}
