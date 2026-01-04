import Link from 'next/link';
import Head from 'next/head';

export default function HomeBestOptimized() {
  // Compact structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SalaryWise.io",
    "description": "Free salary calculator. Calculate gross to net pay, hourly wages, bonuses. Accurate tax calculations for USA, UK, and Ireland.",
    "url": "https://salarywise.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://salarywise.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const calculators = [
    {
      title: "Salary Calculator",
      slug: "salary-calculator",
      description: "Convert hourly to annual salary",
      icon: "💰"
    },
    {
      title: "Gross to Net",
      slug: "gross-to-net",
      description: "Find your take-home pay",
      icon: "📊"
    },
    {
      title: "Take-Home Pay",
      slug: "take-home-pay",
      description: "Calculate net paycheck",
      icon: "💵"
    },
    {
      title: "Hourly to Salary",
      slug: "hourly-to-salary",
      description: "Compare hourly vs salary",
      icon: "⏰"
    }
  ];

  const countries = [
    { name: "USA", slug: "country/usa", flag: "🇺🇸" },
    { name: "UK", slug: "country/uk", flag: "🇬🇧" },
    { name: "Canada", slug: "country/canada", flag: "🇨🇦" },
    { name: "Australia", slug: "country/australia", flag: "🇦🇺" },
    { name: "Ireland", slug: "country/ireland", flag: "🇮🇪" },
    { name: "India", slug: "country/india", flag: "🇮🇳" }
  ];

  return (
    <>
      <Head>
        <title>Salary Calculator | Free Gross to Net Pay Calculator | SalaryWise.io</title>
        <meta name="description" content="Calculate salary, hourly wage, gross to net pay, take-home pay. Free calculators with accurate tax calculations for USA, UK, and Ireland." />
        <meta name="keywords" content="salary calculator, gross to net, take home pay, hourly to salary, pay calculator" />
        <link rel="canonical" href="https://salarywise.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Compact SEO-Optimized Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                Free Salary Calculator
                <span className="block text-lg sm:text-xl font-normal mt-1 text-blue-100">
                  Calculate Your Take-Home Pay Instantly
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto text-blue-100 leading-relaxed px-2">
                Calculate gross to net pay, hourly wages, bonuses. Accurate tax calculations for USA, UK, and Ireland.
              </p>

              {/* Mobile-optimized CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto px-4">
                <Link
                  href="/salary-calculator"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-3 rounded-lg font-bold text-sm transition-all transform active:scale-95 shadow-lg"
                >
                  🧮 Calculate Salary
                </Link>
                <Link
                  href="/gross-to-net"
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
                >
                  📊 Gross to Net
                </Link>
              </div>

              {/* Compact trust indicators */}
              <div className="mt-4 text-xs text-blue-200">
                ✓ Free ✓ No Sign-up ✓ Accurate ✓ Mobile Friendly
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Bar - Mobile optimized */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex justify-around sm:justify-center sm:gap-6">
              <Link
                href="/salary-calculator"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-w-[60px]"
              >
                <span className="text-lg">🧮</span>
                <span className="text-xs font-medium mt-1 text-center">Calculator</span>
              </Link>
              <Link
                href="/gross-to-net"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-w-[60px]"
              >
                <span className="text-lg">📊</span>
                <span className="text-xs font-medium mt-1 text-center">Gross→Net</span>
              </Link>
              <Link
                href="/country/usa"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-w-[60px]"
              >
                <span className="text-lg">🇺🇸</span>
                <span className="text-xs font-medium mt-1 text-center">USA</span>
              </Link>
              <Link
                href="/en/guides/gross-vs-net-salary"
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-w-[60px]"
              >
                <span className="text-lg">📖</span>
                <span className="text-xs font-medium mt-1 text-center">Guides</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Calculator Grid - Performance optimized */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Popular Calculators</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{calc.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{calc.title}</h3>
                  <p className="text-xs text-gray-600 leading-tight">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Compact Country Section */}
        <div className="bg-gray-50 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Country Calculators</h2>
            <p className="text-sm text-gray-600 text-center mb-4">Localized tax calculations</p>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/${country.slug}`}
                  className="bg-white rounded-lg shadow-sm p-3 text-center hover:shadow-md active:shadow-lg transition-all active:scale-95 touch-manipulation border border-gray-100"
                >
                  <div className="text-2xl mb-1">{country.flag}</div>
                  <div className="text-xs font-semibold text-gray-900">{country.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Features - Mobile optimized */}
        <div className="px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Why Choose SalaryWise.io?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Accurate Calculations</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Precise formulas based on current tax rates and regulations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">15+ Countries</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Localized tax rules and currency formatting.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Fast & Free</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Instant results, no registration required.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Guides Section */}
        <div className="bg-gray-50 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Salary Guides</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/en/guides/gross-vs-net-salary"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">Gross vs Net Salary</h3>
                <p className="text-xs text-gray-600 leading-tight">Learn the difference and why it matters for financial planning.</p>
              </Link>

              <Link
                href="/en/guides/how-to-calculate-take-home"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">Calculate Take-Home Pay</h3>
                <p className="text-xs text-gray-600 leading-tight">Step-by-step guide to calculating your net income.</p>
              </Link>

              <Link
                href="/en/guides/salary-negotiation-tips"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">Salary Negotiation</h3>
                <p className="text-xs text-gray-600 leading-tight">Tips for negotiating better compensation.</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <footer className="bg-gray-900 text-white px-4 py-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-xs">
              © 2026 SalaryWise.io - Free salary calculators for everyone.
            </p>
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20 md:hidden shadow-lg">
          <div className="flex justify-around max-w-sm mx-auto">
            <Link
              href="/salary-calculator"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
            >
              <span className="text-lg">🧮</span>
              <span className="text-xs font-medium mt-1">Calculator</span>
            </Link>
            <Link
              href="/gross-to-net"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
            >
              <span className="text-lg">📊</span>
              <span className="text-xs font-medium mt-1">Gross→Net</span>
            </Link>
            <Link
              href="/country/usa"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
            >
              <span className="text-lg">🇺🇸</span>
              <span className="text-xs font-medium mt-1">USA</span>
            </Link>
            <Link
              href="/en/guides/gross-vs-net-salary"
              className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
            >
              <span className="text-lg">📖</span>
              <span className="text-xs font-medium mt-1">Guides</span>
            </Link>
          </div>
        </div>

        {/* Add padding for fixed bottom nav */}
        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}

