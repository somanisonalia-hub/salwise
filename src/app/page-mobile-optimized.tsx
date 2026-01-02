import Link from 'next/link';

export default function HomeMobileOptimized() {
  const featuredCalculators = [
    {
      title: "Salary Calculator",
      slug: "salary-calculator",
      description: "Convert hourly to annual salary instantly",
      icon: "💰",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Gross to Net Calculator",
      slug: "gross-to-net",
      description: "Find your take-home pay after taxes",
      icon: "📊",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Take-Home Pay Calculator",
      slug: "take-home-pay",
      description: "Calculate your net paycheck amount",
      icon: "💵",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Hourly to Salary Calculator",
      slug: "hourly-to-salary",
      description: "Compare hourly vs salaried pay",
      icon: "⏰",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const quickActions = [
    { label: "USA Salary", href: "/country/usa", icon: "🇺🇸" },
    { label: "UK Salary", href: "/country/uk", icon: "🇬🇧" },
    { label: "Tax Guide", href: "/guides/gross-vs-net", icon: "📖" },
    { label: "Calculator", href: "/salary-calculator", icon: "🧮" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Mobile-optimized headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Calculate Your
              <span className="block text-yellow-300">Perfect Salary</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Free salary calculators for gross to net pay, hourly wages, and bonuses.
              Accurate calculations in seconds.
            </p>

            {/* Mobile-optimized CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto px-4">
              <Link
                href="/salary-calculator"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-lg"
              >
                🧮 Calculate Salary
              </Link>
              <Link
                href="/gross-to-net"
                className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
              >
                📊 Gross to Net
              </Link>
            </div>

            {/* Trust indicators for mobile */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">500K+</div>
                <div className="text-xs text-blue-200">Calculations</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">15+</div>
                <div className="text-xs text-blue-200">Countries</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-xs text-blue-200">Free</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar - Mobile optimized */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
              >
                <div className="text-2xl mb-1">{action.icon}</div>
                <div className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Calculator Cards */}
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Calculators</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4 mx-auto`}>
                  <div className="text-3xl">{calc.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{calc.title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{calc.description}</p>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Calculate →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Country Section */}
      <div className="bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Country Calculators</h2>
          <p className="text-gray-600 text-center mb-6 px-4">Localized tax calculations for your country</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { name: "USA", slug: "country/usa", flag: "🇺🇸" },
              { name: "UK", slug: "country/uk", flag: "🇬🇧" },
              { name: "Canada", slug: "country/canada", flag: "🇨🇦" },
              { name: "Australia", slug: "country/australia", flag: "🇦🇺" },
              { name: "Ireland", slug: "country/ireland", flag: "🇮🇪" },
              { name: "India", slug: "country/india", flag: "🇮🇳" }
            ].map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md active:shadow-lg transition-all active:scale-95 touch-manipulation border border-gray-200"
              >
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="text-sm font-semibold text-gray-900">{country.name}</div>
              </Link>
            ))}
          </div>

          {/* Mobile-specific CTA */}
          <div className="text-center">
            <Link
              href="/country/usa"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white px-6 py-3 rounded-lg font-bold transition-all active:scale-95 shadow-lg touch-manipulation"
            >
              🇺🇸 Try USA Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Features */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose SalaryWise.io?
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Accurate Calculations</h3>
                  <p className="text-gray-600 leading-relaxed">Precise formulas based on current tax rates and regulations for reliable results.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">15+ Countries Supported</h3>
                  <p className="text-gray-600 leading-relaxed">Comprehensive coverage with localized tax rules and currency formatting.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast & Free</h3>
                  <p className="text-gray-600 leading-relaxed">Instant calculations with no registration. Optimized for mobile devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Guides Section */}
      <div className="bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Learn More</h2>
          <p className="text-gray-600 text-center mb-6">Educational guides to help you understand salary calculations</p>

          <div className="space-y-4">
            <Link
              href="/guides/gross-vs-net"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Gross vs Net Salary</h3>
                  <p className="text-gray-600 text-sm">Learn the critical difference between gross and net pay</p>
                </div>
                <div className="text-blue-600 ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/guides/how-to-calculate-take-home"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🧮</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Calculate Take-Home Pay</h3>
                  <p className="text-gray-600 text-sm">Step-by-step guide to calculating your net income</p>
                </div>
                <div className="text-blue-600 ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              href="/guides/salary-negotiation"
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">💪</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Salary Negotiation Tips</h3>
                  <p className="text-gray-600 text-sm">Proven strategies to negotiate better compensation</p>
                </div>
                <div className="text-blue-600 ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Footer */}
      <footer className="bg-gray-900 text-white px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2024 SalaryWise.io - Free salary calculators for everyone.
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Mobile-specific: Bottom navigation for quick access */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20 md:hidden">
        <div className="flex justify-around">
          <Link
            href="/salary-calculator"
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
          >
            <span className="text-lg">🧮</span>
            <span className="text-xs font-medium mt-1">Calculator</span>
          </Link>
          <Link
            href="/country/usa"
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
          >
            <span className="text-lg">🇺🇸</span>
            <span className="text-xs font-medium mt-1">USA</span>
          </Link>
          <Link
            href="/guides/gross-vs-net"
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
          >
            <span className="text-lg">📖</span>
            <span className="text-xs font-medium mt-1">Guides</span>
          </Link>
        </div>
      </div>

      {/* Add padding to account for fixed bottom navigation on mobile */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
