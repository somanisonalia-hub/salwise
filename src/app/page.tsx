'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import content from '../locales/en/page.json';

// Newsletter signup component
function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{content.newsletter.title}</h2>
        <p className="text-blue-100 mb-6 text-lg">{content.newsletter.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {content.newsletter.benefits.map((benefit: string, index: number) => (
            <div key={index} className="flex items-center justify-center text-sm">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">{benefit}</span>
            </div>
          ))}
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.newsletter.placeholder}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                {content.newsletter.buttonText}
              </button>
            </div>
            <p className="text-blue-200 text-sm">{content.newsletter.privacy}</p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg mb-4">
              ✅ {content.newsletter.successMessage}
            </div>
            <p className="text-blue-200 text-sm">Welcome to the SalaryWise community!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced homepage component with improved UX
function HomePageContent() {
  const [searchQuery, setSearchQuery] = useState('');

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

  // Create searchable index of all calculators
  const searchableItems = useMemo(() => {
    // Handle different calculator structures (EN has categories, ES/FR have items)
    const calculatorItems = (content.calculators as any).categories
      ? (content.calculators as any).categories.flatMap((category: any) =>
          category.items.map((item: any) => ({ ...item, category: 'calculator' }))
        )
      : (content.calculators as any).items?.map((item: any) => ({ ...item, category: 'calculator' })) || [];

    // Handle countries (may not exist in all locales)
    const countryItems = content.countries?.items?.map(item => ({
      ...item,
      category: 'country',
      title: item.name,
      description: `Calculate salary after tax in ${item.name}`,
      icon: item.flag // Use flag as icon for countries
    })) || [];

    // Handle different guide structures (EN has categories.guides, ES/FR have items)
    const guideItems = (content.guides as any).categories
      ? (content.guides as any).categories.flatMap((category: any) =>
          category.guides.map((item: any) => ({ ...item, category: 'guide', icon: '📖' }))
        )
      : (content.guides as any).items?.map((item: any) => ({ ...item, category: 'guide', icon: '📖' })) || [];

    const allItems = [
      ...calculatorItems,
      ...countryItems,
      ...guideItems,
    ];
    return allItems;
  }, []);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null; // Show all when no search

    const query = searchQuery.toLowerCase();
    return searchableItems.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }, [searchQuery, searchableItems]);

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

              {/* Search Field */}
              <div className="max-w-md mx-auto px-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search calculators, countries, guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-blue-200 mt-2 text-center">
                    {filteredItems?.length || 0} results found
                  </p>
                )}
              </div>

              {/* Mobile-optimized CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto px-4">
                <Link
                  href={`/en${content.hero.cta.primary.href}`}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-3 rounded-lg font-bold text-sm transition-all transform active:scale-95 shadow-lg text-center"
                >
                  {content.hero.cta.primary.text}
                </Link>
                <Link
                  href={`/en${content.hero.cta.secondary.href}`}
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 text-center"
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

        {/* Dynamic Content Grid - Calculators or Search Results */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {searchQuery ? `Search Results for "${searchQuery}"` : content.calculators.title}
          </h2>

          {searchQuery ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredItems?.map((item, index) => (
                <Link
                  key={index}
                  href={`/en${item.href}`}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                    {searchQuery && 'category' in item && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {(item as any).category}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {content.calculators.categories ? (
                // EN structure with categories
                content.calculators.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item, index) => (
                        <Link
                          key={index}
                          href={`/en${item.href}`}
                          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                              {item.features && (
                                <div className="flex flex-wrap gap-1">
                                  {item.features.slice(0, 2).map((feature, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // ES/FR structure with flat items
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.calculators.title || 'Calculadoras'}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(content.calculators as any).items?.map((item: any, index: number) => (
                      <Link
                        key={index}
                        href={`/en${item.href}`}
                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md active:shadow-lg transition-all active:scale-[0.98] touch-manipulation border border-gray-100"
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-tight">{item.description}</p>
                        </div>
                      </Link>
                    )) || []}
                  </div>
                </div>
              )}
            </div>
          )}

          {searchQuery && filteredItems?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No results found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear search
              </button>
            </div>
          )}
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
              {((content.guides as any).categories
                ? (content.guides as any).categories.flatMap((category: any) => category.guides)
                : (content.guides as any).items || []
              ).slice(0, 3).map((guide: any, index: number) => (
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

        {/* Social Proof Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.socialProof.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {Object.entries(content.socialProof.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{value}</div>
                    <div className="text-gray-600 capitalize text-sm">
                      {key === 'users' ? 'Happy Users' :
                       key === 'calculations' ? 'Calculations Run' :
                       key === 'countries' ? 'Countries' :
                       key === 'accuracy' ? 'Accuracy' :
                       key === 'satisfaction' ? 'Satisfaction' : key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {content.socialProof.testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                    </div>
                    {testimonial.verified && (
                      <span className="ml-auto text-green-600 text-sm font-medium">✓ Verified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {content.socialProof.trustBadges.map((badge: string, index: number) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-900 py-16">
          <NewsletterSignup />
        </div>

        {/* Urgency Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.urgency.title}</h2>
            <p className="text-xl mb-6 text-red-100">{content.urgency.message}</p>
            <Link
              href={`/en${content.urgency.href}`}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl text-lg"
            >
              {content.urgency.cta}
            </Link>
          </div>
        </div>

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

// Server component wrapper for SEO compatibility
export default function HomePage() {
  return <HomePageContent />;
}
