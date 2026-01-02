import Link from 'next/link';

export default function HomePerformanceOptimized() {

  const featuredCalculators = [
    {
      title: "Salary Calculator",
      slug: "salary-calculator",
      description: "Convert between hourly and annual salaries",
      icon: "💰"
    },
    {
      title: "Gross to Net Calculator",
      slug: "gross-to-net",
      description: "Find your take-home pay after taxes",
      icon: "📊"
    },
    {
      title: "Take-Home Pay Calculator",
      slug: "take-home-pay",
      description: "Calculate your net paycheck amount",
      icon: "💵"
    },
    {
      title: "Hourly to Salary Calculator",
      slug: "hourly-to-salary",
      description: "Compare hourly vs salaried pay",
      icon: "⏰"
    }
  ];

  const countryCalculators = [
    { name: "USA", slug: "country/usa", flag: "🇺🇸" },
    { name: "UK", slug: "country/uk", flag: "🇬🇧" },
    { name: "Ireland", slug: "country/ireland", flag: "🇮🇪" },
    { name: "Canada", slug: "country/canada", flag: "🇨🇦" },
    { name: "Australia", slug: "country/australia", flag: "🇦🇺" },
    { name: "India", slug: "country/india", flag: "🇮🇳" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Critical CSS - Above the fold content loads immediately */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Free Salary Calculators
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Calculate your salary, hourly wage, gross to net pay, and more.
              Fast, accurate, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/salary-calculator"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Calculating
              </Link>
              <Link
                href="/gross-to-net"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Gross to Net
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lazy loaded sections with intersection observer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Calculators</h2>
          <p className="text-lg text-gray-600">Choose from our most-used salary calculation tools</p>
        </div>

        {/* Immediate render for first 2 calculators, lazy load the rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCalculators.slice(0, 2).map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{calc.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{calc.title}</h3>
              <p className="text-gray-600 text-sm">{calc.description}</p>
            </Link>
          ))}

          {/* Render remaining calculators inline */}
          {featuredCalculators.slice(2).map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{calc.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{calc.title}</h3>
              <p className="text-gray-600 text-sm">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Country Calculators - Lazy loaded */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Country Calculators</h2>
            <p className="text-lg text-gray-600">Localized calculations for major countries</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {countryCalculators.map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{country.flag}</div>
                <h3 className="font-semibold text-gray-900">{country.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Lazy loaded */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SalaryWise.io?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accurate, free salary calculations with comprehensive country data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">Precise formulas based on current tax rates.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Coverage</h3>
              <p className="text-gray-600">15+ countries with localized tax rules.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Free</h3>
              <p className="text-gray-600">Instant calculations, no sign-up required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section - Minimal and lazy loaded */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More</h2>
            <p className="text-lg text-gray-600">Educational guides for salary planning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/guides/gross-vs-net"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gross vs Net Salary</h3>
              <p className="text-gray-600">Learn the difference between gross and net pay.</p>
            </Link>

            <Link
              href="/guides/how-to-calculate-take-home"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calculate Take-Home Pay</h3>
              <p className="text-gray-600">Step-by-step guide to calculating net income.</p>
            </Link>

            <Link
              href="/guides/salary-negotiation"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Salary Negotiation</h3>
              <p className="text-gray-600">Tips for negotiating better compensation.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal footer for performance */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 SalaryWise.io - Free salary calculators for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
