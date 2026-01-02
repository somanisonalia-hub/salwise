import Link from 'next/link';
import Head from 'next/head';
import content from '../locales/en/page.json';

export default function HomePage() {
  // Compact structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SalaryWise.io",
    "description": content.seo.description,
    "url": "https://salarywise.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://salarywise.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
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
                {content.hero.title}
                <span className="block text-lg sm:text-xl font-normal mt-1 text-blue-100">
                  {content.hero.subtitle}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto text-blue-100 leading-relaxed px-2">
                {content.hero.description}
              </p>

              {/* Mobile-optimized CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto px-4">
                <Link
                  href={`/en${content.hero.cta.primary.href}`}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-3 rounded-lg font-bold text-sm transition-all transform active:scale-95 shadow-lg"
                >
                  {content.hero.cta.primary.text}
                </Link>
                <Link
                  href={`/en${content.hero.cta.secondary.href}`}
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
                >
                  {content.hero.cta.secondary.text}
                </Link>
              </div>

              {/* Compact trust indicators */}
              <div className="mt-4 text-xs text-blue-200">
                {content.hero.trustIndicators}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Bar - Mobile optimized */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex justify-around sm:justify-center sm:gap-6">
              {content.quickAccess.links.map((link, index) => (
                <Link
                  key={index}
                  href={`/en${link.href}`}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-w-[60px]"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-xs font-medium mt-1 text-center">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Calculator Grid - Performance optimized */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">{content.calculators.title}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {content.calculators.items.map((calc, index) => (
              <Link
                key={index}
                href={`/en${calc.href}`}
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

        {/* Calculator Categories - New section */}
        <div className="bg-gray-50 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Calculator Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/en/country"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Country Calculators</h3>
                    <p className="text-xs text-gray-600">15 countries with localized tax rules</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/en/industry"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Industry Calculators</h3>
                    <p className="text-xs text-gray-600">10 job-specific salary calculators</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/en/guides"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📚</div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Educational Guides</h3>
                    <p className="text-xs text-gray-600">Learn salary concepts & negotiation</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Country Section */}
        <div className="bg-gray-50 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">{content.countries.title}</h2>
            <p className="text-sm text-gray-600 text-center mb-4">{content.countries.description}</p>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {content.countries.items.map((country, index) => (
                <Link
                  key={index}
                  href={`/en${country.href}`}
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
              {content.features.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.features.items.map((feature, index) => {
                const iconColors = {
                  check: 'bg-blue-100 text-blue-600',
                  globe: 'bg-green-100 text-green-600',
                  bolt: 'bg-purple-100 text-purple-600'
                };

                return (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${iconColors[feature.icon as keyof typeof iconColors] || 'bg-gray-100 text-gray-600'}`}>
                        {feature.icon === 'check' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {feature.icon === 'globe' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                        )}
                        {feature.icon === 'bolt' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compact Guides Section - Defer loading for better LCP */}
        <div className="bg-gray-50 px-4 py-6" style={{ contain: 'layout style paint' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">{content.guides.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {content.guides.items.slice(0, 3).map((guide, index) => (
                <Link
                  key={index}
                  href={`/en${guide.href}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
                >
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-xs text-gray-600 leading-tight">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Calculators</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/salary-calculator/" className="text-gray-600 hover:text-blue-600">Salary Calculator</Link></li>
                  <li><Link href="/en/hourly-to-salary-calculator/" className="text-gray-600 hover:text-blue-600">Hourly to Salary</Link></li>
                  <li><Link href="/en/gross-to-net-salary/" className="text-gray-600 hover:text-blue-600">Gross to Net</Link></li>
                  <li><Link href="/en/take-home-pay-calculator/" className="text-gray-600 hover:text-blue-600">Take Home Pay</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">By Country</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/salary-after-tax-usa/" className="text-gray-600 hover:text-blue-600">USA</Link></li>
                  <li><Link href="/en/salary-after-tax-uk/" className="text-gray-600 hover:text-blue-600">UK</Link></li>
                  <li><Link href="/en/salary-calculator-canada/" className="text-gray-600 hover:text-blue-600">Canada</Link></li>
                  <li><Link href="/en/salary-calculator-australia/" className="text-gray-600 hover:text-blue-600">Australia</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">By Industry</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/salary-calculator-it-tech/" className="text-gray-600 hover:text-blue-600">IT & Tech</Link></li>
                  <li><Link href="/en/salary-calculator-healthcare/" className="text-gray-600 hover:text-blue-600">Healthcare</Link></li>
                  <li><Link href="/en/salary-calculator-finance-banking/" className="text-gray-600 hover:text-blue-600">Finance</Link></li>
                  <li><Link href="/en/salary-calculator-engineering/" className="text-gray-600 hover:text-blue-600">Engineering</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guides</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/understanding-gross-vs-net-salary/" className="text-gray-600 hover:text-blue-600">Gross vs Net</Link></li>
                  <li><Link href="/en/salary-negotiation-tips/" className="text-gray-600 hover:text-blue-600">Salary Negotiation</Link></li>
                  <li><Link href="/en/taxes-explained-by-country/" className="text-gray-600 hover:text-blue-600">Taxes by Country</Link></li>
                  <li><Link href="/en/salary-trends-2026-global/" className="text-gray-600 hover:text-blue-600">2026 Trends</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">© 2024 SalaryWise.io. Free salary calculators for everyone.</p>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation - Optimized for performance */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20 md:hidden shadow-lg">
          <div className="flex justify-around max-w-sm mx-auto">
            {content.mobileNav.links.slice(0, 4).map((link, index) => (
              <Link
                key={index}
                href={`/en${link.href}`}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-xs font-medium mt-1">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Add padding for fixed bottom nav */}
        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}
