import Link from 'next/link';
import Head from 'next/head';

export default function GuidesPageFocused() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Salary Calculation Guides",
    "url": "https://salarywise.io/guides",
    "description": "Comprehensive salary calculation guides. Learn about gross vs net pay, tax deductions, salary negotiation, and financial planning.",
    "publisher": {
      "@type": "Organization",
      "name": "SalaryWise.io"
    }
  };

  const guides = [
    {
      id: 'gross-vs-net',
      title: 'Gross vs Net Salary Guide',
      slug: 'guides/gross-vs-net',
      description: 'Understand the critical difference between gross salary and net take-home pay with detailed examples and calculations.',
      icon: '📊',
      readTime: '5 min read',
      category: 'Tax Basics',
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'calculate-take-home',
      title: 'How to Calculate Take-Home Pay',
      slug: 'guides/how-to-calculate-take-home',
      description: 'Step-by-step guide to calculating your take-home pay after taxes, deductions, and withholdings.',
      icon: '🧮',
      readTime: '7 min read',
      category: 'Calculations',
      popular: true,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'salary-negotiation',
      title: 'Salary Negotiation Strategies',
      slug: 'guides/salary-negotiation',
      description: 'Proven techniques to negotiate your salary effectively and get the compensation you deserve.',
      icon: '💪',
      readTime: '8 min read',
      category: 'Career',
      popular: true,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const guideCategories = [
    {
      name: 'Tax Basics',
      description: 'Understanding taxes and deductions',
      guides: 1,
      icon: '💰'
    },
    {
      name: 'Calculations',
      description: 'How to calculate salaries and taxes',
      guides: 1,
      icon: '🧮'
    },
    {
      name: 'Career',
      description: 'Salary negotiation and career planning',
      guides: 1,
      icon: '📈'
    }
  ];

  const learningPaths = [
    {
      title: 'New to Salary Calculations',
      description: 'Start with the fundamentals',
      steps: [
        { name: 'Gross vs Net Salary', slug: 'guides/gross-vs-net' },
        { name: 'Calculate Take-Home Pay', slug: 'guides/how-to-calculate-take-home' }
      ]
    },
    {
      title: 'Career Advancement',
      description: 'Maximize your earning potential',
      steps: [
        { name: 'Salary Negotiation', slug: 'guides/salary-negotiation' },
        { name: 'Gross vs Net Salary', slug: 'guides/gross-vs-net' }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Salary Calculation Guides | Learn About Pay & Taxes | SalaryWise.io</title>
        <meta name="description" content="Comprehensive salary calculation guides. Learn about gross vs net pay, tax deductions, salary negotiation, and financial planning with expert advice." />
        <meta name="keywords" content="salary guides, gross vs net, take home pay, salary negotiation, tax guide, financial planning" />
        <link rel="canonical" href="https://salarywise.io/guides" />
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
                <h1 className="text-2xl font-bold text-gray-900">Salary Calculation Guides</h1>
                <p className="text-gray-600 mt-1">Learn everything about salaries, taxes, and financial planning</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">Master Salary Calculations & Financial Planning</h2>
            <p className="text-gray-700 mb-4">
              Our comprehensive guides help you understand salary calculations, tax deductions, negotiation strategies,
              and financial planning. Whether you're new to salary calculations or looking to maximize your earnings,
              these expert guides provide the knowledge you need.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-blue-800">Expert Guides</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-2xl font-bold text-green-600">20+</div>
                <div className="text-sm text-green-800">Minutes Read</div>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-2xl font-bold text-purple-600">Free</div>
                <div className="text-sm text-purple-800">Always Free</div>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <div className="text-2xl font-bold text-orange-600">2024</div>
                <div className="text-sm text-orange-800">Updated Data</div>
              </div>
            </div>
          </div>

          {/* Popular Guides */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              Featured Guides
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <article key={guide.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
                  <Link href={`/${guide.slug}`} className="block">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center mb-4`}>
                      <div className="text-2xl">{guide.icon}</div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{guide.description}</p>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{guide.category}</span>
                      <span>{guide.readTime}</span>
                    </div>

                    <div className="text-blue-600 font-medium text-sm hover:text-blue-800">
                      Read Guide →
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Guide Categories */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Explore by Category</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guideCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold text-gray-900">{category.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <div className="text-blue-600 text-sm font-medium">{category.guides} guide{category.guides > 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Paths */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-6 text-white">
            <h3 className="text-xl font-bold mb-4">Learning Paths</h3>
            <p className="text-blue-100 mb-6">Follow these structured learning paths to master salary calculations</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.map((path, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">{path.title}</h4>
                  <p className="text-blue-100 text-sm mb-4">{path.description}</p>

                  <div className="space-y-2">
                    {path.steps.map((step, stepIndex) => (
                      <Link
                        key={stepIndex}
                        href={`/${step.slug}`}
                        className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                      >
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm">{step.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Read Our Guides */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Why Our Salary Guides?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Expert Knowledge</div>
                    <div className="text-gray-600 text-sm">Written by financial experts with years of experience</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">2024 Updated</div>
                    <div className="text-gray-600 text-sm">Latest tax laws, rates, and financial information</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Practical Examples</div>
                    <div className="text-gray-600 text-sm">Real-world calculations and scenarios</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Forever</div>
                    <div className="text-gray-600 text-sm">No subscriptions, no paywalls, always accessible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Calculator Access */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link
              href="/salary-calculator"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium">Try Calculator</div>
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
              <div className="text-sm font-medium">Country Calc</div>
            </Link>

            <Link
              href="/industry/it"
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="text-sm font-medium">Industry Calc</div>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Guide FAQs</h3>

            <div className="space-y-4">
              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Are these guides free to read?</summary>
                <p className="mt-2 text-gray-600">Yes, all our salary calculation guides are completely free to read. No registration or subscription required.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">How often are the guides updated?</summary>
                <p className="mt-2 text-gray-600">We update our guides annually to reflect changes in tax laws, salary trends, and financial regulations to ensure accuracy.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Can I share these guides?</summary>
                <p className="mt-2 text-gray-600">Absolutely! Feel free to share our guides with friends, family, or colleagues who might benefit from learning about salary calculations.</p>
              </details>

              <details className="border border-gray-200 rounded p-4">
                <summary className="font-medium cursor-pointer">Do you offer personalized advice?</summary>
                <p className="mt-2 text-gray-600">Our guides provide general educational information. For personalized financial or tax advice, please consult with qualified professionals.</p>
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
            <Link href="/salary-calculator" className="flex flex-col items-center p-2">
              <span className="text-lg">🧮</span>
              <span className="text-xs font-medium mt-1">Calculator</span>
            </Link>
            <Link href="/gross-to-net" className="flex flex-col items-center p-2">
              <span className="text-lg">📚</span>
              <span className="text-xs font-medium mt-1">Guides</span>
            </Link>
          </div>
        </div>

        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}

