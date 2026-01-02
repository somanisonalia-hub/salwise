import Link from 'next/link';
import Head from 'next/head';

export default function IndustryPageFocused() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Industry Salary Calculators",
    "url": "https://salarywise.io/industry",
    "description": "Calculate salaries by industry with specialized calculators for tech, finance, healthcare, and more. Industry-specific tax deductions and benefits.",
    "publisher": {
      "@type": "Organization",
      "name": "SalaryWise.io"
    }
  };

  const industries = [
    {
      id: 'it',
      name: 'Information Technology',
      slug: 'industry/it',
      icon: '💻',
      avgSalary: '$110K',
      growth: '+15%',
      description: 'Software development, cybersecurity, data science',
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'finance',
      name: 'Finance & Banking',
      slug: 'industry/finance',
      icon: '🏦',
      avgSalary: '$95K',
      growth: '+8%',
      description: 'Investment banking, financial analysis, accounting',
      popular: true,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      slug: 'industry/healthcare',
      icon: '🏥',
      avgSalary: '$85K',
      growth: '+12%',
      description: 'Nursing, medical professionals, healthcare administration',
      popular: true,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'engineering',
      name: 'Engineering',
      slug: 'industry/engineering',
      icon: '⚙️',
      avgSalary: '$90K',
      growth: '+10%',
      description: 'Mechanical, electrical, civil engineering',
      popular: false,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'marketing',
      name: 'Marketing & Sales',
      slug: 'industry/marketing',
      icon: '📈',
      avgSalary: '$75K',
      growth: '+9%',
      description: 'Digital marketing, sales, business development',
      popular: false,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'education',
      name: 'Education',
      slug: 'industry/education',
      icon: '🎓',
      avgSalary: '$60K',
      growth: '+6%',
      description: 'Teaching, administration, educational technology',
      popular: false,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const popularIndustries = industries.filter(i => i.popular);
  const otherIndustries = industries.filter(i => !i.popular);

  const salaryInsights = [
    {
      industry: 'Technology',
      insight: 'Highest paying industry with 15% annual growth',
      icon: '🚀'
    },
    {
      industry: 'Healthcare',
      insight: 'Stable demand with competitive compensation',
      icon: '💼'
    },
    {
      industry: 'Finance',
      insight: 'Bonus-heavy industry with performance incentives',
      icon: '💰'
    }
  ];

  return (
    <>
      <Head>
        <title>Industry Salary Calculators | Salary by Profession | SalaryWise.io</title>
        <meta name="description" content="Calculate salaries by industry with specialized calculators for IT, finance, healthcare, engineering. Industry-specific tax deductions and benefits." />
        <meta name="keywords" content="industry salary calculator, salary by profession, industry pay calculator, career salary comparison" />
        <link rel="canonical" href="https://salarywise.io/industry" />
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
                <h1 className="text-2xl font-bold text-gray-900">Industry Salary Calculators</h1>
                <p className="text-gray-600 mt-1">Calculate salaries by profession and industry</p>
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
        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* Introduction */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Industry-Specific Salary Calculations</h2>
            <p className="text-gray-700 mb-4">
              Different industries offer unique compensation structures, benefits, and tax advantages.
              Use our industry calculators to understand salaries in your field and make informed career decisions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-blue-800">Industries Covered</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-2xl font-bold text-green-600">Updated</div>
                <div className="text-sm text-green-800">2024 Data</div>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-2xl font-bold text-purple-600">Industry</div>
                <div className="text-sm text-purple-800">Tax Benefits</div>
              </div>
            </div>
          </div>

          {/* Popular Industries */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              Popular Industries
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularIndustries.map((industry) => (
                <Link
                  key={industry.id}
                  href={`/${industry.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation block"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 mx-auto`}>
                      <div className="text-2xl">{industry.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{industry.name}</h4>
                    <div className="text-sm text-gray-600 mb-2">{industry.description}</div>
                    <div className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                      <span className="font-medium text-gray-700">Avg: {industry.avgSalary}</span>
                      <span className="text-green-600 font-medium">{industry.growth} growth</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Industries */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">More Industries</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherIndustries.map((industry) => (
                <Link
                  key={industry.id}
                  href={`/${industry.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation block"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{industry.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{industry.name}</h4>
                      <div className="text-sm text-gray-600">{industry.description}</div>
                      <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="font-medium text-gray-700">Avg: {industry.avgSalary}</span>
                        <span className="text-green-600 font-medium">{industry.growth}</span>
                      </div>
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

          {/* Salary Insights */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-6 text-white">
            <h3 className="text-xl font-bold mb-4">Industry Salary Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salaryInsights.map((insight, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{insight.icon}</span>
                    <span className="font-semibold">{insight.industry}</span>
                  </div>
                  <p className="text-blue-100 text-sm">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Comparison Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Industry Salary Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Industry</th>
                    <th className="text-left py-3 font-semibold">Avg Salary</th>
                    <th className="text-left py-3 font-semibold">Growth Rate</th>
                    <th className="text-left py-3 font-semibold">Key Roles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {industries.map((industry) => (
                    <tr key={industry.id} className="hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{industry.icon}</span>
                          <span className="font-medium">{industry.name}</span>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-blue-600">{industry.avgSalary}</td>
                      <td className="py-3">
                        <span className="text-green-600 font-medium">{industry.growth}</span>
                      </td>
                      <td className="py-3 text-gray-600 max-w-xs truncate">{industry.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link
              href="/salary-calculator"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium">Salary Calculator</div>
            </Link>

            <Link
              href="/gross-to-net"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Tax Calculator</div>
            </Link>

            <Link
              href="/country/usa"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">🇺🇸</div>
              <div className="text-sm font-medium">USA Calculator</div>
            </Link>

            <Link
              href="/guides/gross-vs-net"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium">Salary Guide</div>
            </Link>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Why Industry Matters for Salary</h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-3">
                Different industries offer vastly different compensation packages, benefits, and career growth opportunities.
                Understanding industry-specific salary trends helps you make informed career decisions.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">Industry Factors Affecting Salary:</h4>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Market Demand:</strong> High-demand industries pay premium salaries</li>
                <li><strong>Skill Requirements:</strong> Specialized skills command higher pay</li>
                <li><strong>Performance Bonuses:</strong> Some industries offer significant bonuses</li>
                <li><strong>Benefits Packages:</strong> Healthcare, retirement, and other benefits vary</li>
                <li><strong>Location Costs:</strong> Salary adjustments for cost of living</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
                <p className="text-yellow-800">
                  <strong>💡 Career Tip:</strong> Research industry salary trends and growth projections when considering career changes.
                  Use our industry calculators to compare potential earnings across different fields.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Industry Salary FAQs</h3>

            <div className="space-y-4">
              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Which industries pay the highest salaries?</summary>
                <p className="mt-2 text-gray-600">Technology, finance, and healthcare industries typically offer the highest salaries. Engineering and energy sectors also provide competitive compensation packages.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">How often are industry salaries updated?</summary>
                <p className="mt-2 text-gray-600">We update salary data annually based on the latest industry reports, government data, and compensation surveys to ensure accuracy.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Do bonuses affect industry salary rankings?</summary>
                <p className="mt-2 text-gray-600">Yes, industries like finance and technology often include significant performance bonuses that can substantially increase total compensation beyond base salary.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">How does location affect industry salaries?</summary>
                <p className="mt-2 text-gray-600">Cost of living adjustments, local market rates, and industry concentration in certain areas all influence salaries within the same industry across different locations.</p>
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
            <Link href="/salary-calculator" className="flex flex-col items-center p-2">
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
