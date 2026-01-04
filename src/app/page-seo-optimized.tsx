import Link from 'next/link';
import Head from 'next/head';

export default function HomeSEOOptimized() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SalaryWise.io - Free Salary Calculators",
    "description": "Calculate salary, hourly wage, gross to net pay, take-home pay, and bonuses with our free salary calculators. Compare salaries across USA, UK, and Ireland.",
    "url": "https://salarywise.io",
    "publisher": {
      "@type": "Organization",
      "name": "SalaryWise.io",
      "url": "https://salarywise.io"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://salarywise.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const featuredCalculators = [
    {
      title: "Salary Calculator",
      slug: "salary-calculator",
      description: "Convert between hourly and annual salaries with our comprehensive calculator. Calculate your exact salary requirements.",
      icon: "💰",
      keywords: ["salary calculator", "hourly to annual", "salary conversion"]
    },
    {
      title: "Gross to Net Calculator",
      slug: "gross-to-net",
      description: "Find out your take-home pay after taxes and deductions. Calculate net salary from gross earnings instantly.",
      icon: "📊",
      keywords: ["gross to net", "take home pay", "net salary calculator"]
    },
    {
      title: "Take-Home Pay Calculator",
      slug: "take-home-pay",
      description: "Calculate your actual paycheck amount after all deductions. Know exactly what you'll earn each month.",
      icon: "💵",
      keywords: ["take home pay", "net income", "paycheck calculator"]
    },
    {
      title: "Hourly to Salary Calculator",
      slug: "hourly-to-salary",
      description: "Convert your hourly wage to annual salary and compare job offers. Make informed career decisions.",
      icon: "⏰",
      keywords: ["hourly to salary", "wage converter", "annual salary"]
    }
  ];

  const countryCalculators = [
    { name: "USA", slug: "country/usa", flag: "🇺🇸", description: "US salary calculator with federal and state taxes" },
    { name: "UK", slug: "country/uk", flag: "🇬🇧", description: "UK salary calculator with National Insurance" },
    { name: "Ireland", slug: "country/ireland", flag: "🇮🇪", description: "Irish salary calculator with USC and PRSI" },
    { name: "Canada", slug: "country/canada", flag: "🇨🇦", description: "Canadian salary calculator with CPP and EI" },
    { name: "Australia", slug: "country/australia", flag: "🇦🇺", description: "Australian salary calculator with superannuation" },
    { name: "India", slug: "country/india", flag: "🇮🇳", description: "Indian salary calculator with income tax" }
  ];

  return (
    <>
      <Head>
        <title>Salary Calculator | Free Gross to Net Pay Calculator | SalaryWise.io</title>
        <meta name="description" content="Calculate salary, hourly wage, gross to net pay, take-home pay, and bonuses with our free salary calculators. Compare salaries across USA, UK, and Ireland. Accurate tax calculations." />
        <meta name="keywords" content="salary calculator, gross to net, take home pay, hourly to salary, pay calculator, net income, paycheck calculator, tax calculator" />
        <link rel="canonical" href="https://salarywise.io" />
        <meta property="og:title" content="Salary Calculator | Free Gross to Net Pay Calculator" />
        <meta property="og:description" content="Calculate your salary, hourly wage, and take-home pay with our free calculators. Compare salaries across countries." />
        <meta property="og:url" content="https://salarywise.io" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* SEO-Optimized Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Free Salary Calculator
                <span className="block text-2xl md:text-4xl font-normal mt-2 text-blue-100">
                  Calculate Your Take-Home Pay Instantly
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Calculate salary, hourly wage, gross to net pay, take-home pay, and bonuses with our free salary calculators.
                Compare salaries across USA, UK, and Ireland with accurate tax calculations and localized currency support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/salary-calculator"
                  className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  🧮 Start Calculating Salary
                </Link>
                <Link
                  href="/gross-to-net"
                  className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  📊 Gross to Net Calculator
                </Link>
              </div>
              <div className="text-blue-100 text-sm">
                ✓ Free • ✓ No Sign-up Required • ✓ Accurate Tax Calculations • ✓ 15+ Countries Supported
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation for SEO */}
        <nav className="bg-white border-b border-gray-200 py-3" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
              <li className="text-gray-400">•</li>
              <li className="text-gray-600">Salary Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Featured Calculators with Rich Snippets */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Salary Calculators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our most-used salary calculation tools. All calculators are free, accurate, and updated with current tax rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCalculators.map((calc, index) => (
              <article key={calc.slug} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Link href={`/${calc.slug}`} className="block">
                  <div className="text-5xl mb-4 text-center">{calc.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{calc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{calc.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {calc.keywords.map(keyword => (
                      <span key={keyword} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Calculate Now →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Country Calculators with Schema.org */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Country-Specific Salary Calculators
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Localized tax calculations for major countries. Each calculator includes country-specific tax rules, deductions, and currency formatting.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {countryCalculators.map((country) => (
                <Link
                  key={country.slug}
                  href={`/${country.slug}`}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{country.flag}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{country.name}</h3>
                  <p className="text-gray-600 text-xs leading-tight">{country.description}</p>
                  <div className="mt-3 text-blue-600 font-medium text-sm">Calculate →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section with Rich Snippets */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose SalaryWise.io?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of users who trust our accurate salary calculators for financial planning and career decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Accurate Tax Calculations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our salary calculators use the most current tax rates, brackets, and deduction rules for accurate calculations.
                  Updated regularly to reflect changes in tax laws and regulations.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">15+ Countries Supported</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive coverage of major economies including USA, UK, Canada, Australia, Ireland, and India.
                  Each country calculator includes localized tax rules and currency formatting.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast & Free</h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant calculations with no registration required. Our optimized calculators load in under 2 seconds
                  and provide real-time results as you type. Always free, no hidden fees or premium features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Guides Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Salary Calculation Guides
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn everything you need to know about salary calculations, tax deductions, and financial planning with our comprehensive guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Link href="/en/guides/gross-vs-net-salary">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Understanding Gross vs Net Salary</h3>
                  <p className="text-gray-600 mb-4">Learn the critical difference between gross salary and net take-home pay. Includes examples and calculations for better financial planning.</p>
                  <div className="text-blue-600 font-medium">Read Guide →</div>
                </Link>
              </article>

              <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Link href="/en/guides/how-to-calculate-take-home">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">How to Calculate Take-Home Pay</h3>
                  <p className="text-gray-600 mb-4">Step-by-step guide to calculating your take-home pay after taxes and deductions. Includes federal, state, and local tax calculations.</p>
                  <div className="text-blue-600 font-medium">Read Guide →</div>
                </Link>
              </article>

              <article className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Link href="/en/guides/salary-negotiation-tips">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Salary Negotiation Strategies</h3>
                  <p className="text-gray-600 mb-4">Proven techniques to negotiate your salary effectively. Learn how to research market rates and present your value to employers.</p>
                  <div className="text-blue-600 font-medium">Read Guide →</div>
                </Link>
              </article>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Common questions about salary calculations and our calculators</p>
            </div>

            <div className="space-y-6">
              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">Are your salary calculations accurate?</summary>
                <p className="mt-3 text-gray-600">Yes, our calculators use current tax rates and formulas. However, actual take-home pay may vary based on individual circumstances and local tax laws.</p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">Which countries do you support?</summary>
                <p className="mt-3 text-gray-600">We support salary calculations for USA, UK, Ireland, Canada, Australia, India, and several other major countries with localized tax rules.</p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6">
                <summary className="font-semibold text-gray-900 cursor-pointer">Is there a cost to use your calculators?</summary>
                <p className="mt-3 text-gray-600">No, all our salary calculators are completely free to use. No registration or sign-up required.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

