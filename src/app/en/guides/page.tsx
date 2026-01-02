'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

export default function GuidesPageFocused() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      slug: 'understanding-gross-vs-net-salary',
      description: 'Understand the critical difference between gross salary and net take-home pay with detailed examples and calculations.',
      excerpt: 'Master the fundamentals of salary calculations. Learn what gross and net pay mean, how they differ, and why it matters for your financial planning.',
      icon: '📊',
      readTime: '5 min read',
      category: 'Tax Basics',
      popular: true,
      featured: true,
      color: 'from-blue-500 to-blue-600',
      author: 'SalaryWise Team',
      publishDate: '2024-01-15',
      tags: ['gross salary', 'net salary', 'tax basics', 'salary calculation']
    },
    {
      id: 'calculate-take-home',
      title: 'How to Calculate Take-Home Pay',
      slug: 'how-to-calculate-take-home-pay',
      description: 'Step-by-step guide to calculating your take-home pay after taxes, deductions, and withholdings.',
      excerpt: 'A comprehensive walkthrough of take-home pay calculations. Includes real examples, common deductions, and tips for accurate salary planning.',
      icon: '🧮',
      readTime: '7 min read',
      category: 'Calculations',
      popular: true,
      featured: false,
      color: 'from-green-500 to-green-600',
      author: 'SalaryWise Team',
      publishDate: '2024-01-20',
      tags: ['take-home pay', 'salary calculation', 'deductions', 'tax calculation']
    },
    {
      id: 'salary-negotiation',
      title: 'Salary Negotiation Strategies',
      slug: 'salary-negotiation-tips',
      description: 'Proven techniques to negotiate your salary effectively and get the compensation you deserve.',
      excerpt: 'Boost your earning potential with expert negotiation strategies. Learn when to negotiate, what to ask for, and how to present your case effectively.',
      icon: '💪',
      readTime: '8 min read',
      category: 'Career',
      popular: true,
      featured: false,
      color: 'from-purple-500 to-purple-600',
      author: 'SalaryWise Team',
      publishDate: '2024-01-25',
      tags: ['salary negotiation', 'career advice', 'job offers', 'compensation']
    },
    {
      id: 'taxes-explained',
      title: 'Taxes Explained by Country',
      slug: 'taxes-explained-by-country',
      description: 'Comprehensive guide to tax systems and requirements across different countries.',
      excerpt: 'Navigate international tax systems with confidence. Country-by-country breakdown of tax rates, deductions, and compliance requirements.',
      icon: '🌍',
      readTime: '10 min read',
      category: 'Tax Basics',
      popular: true,
      featured: false,
      color: 'from-orange-500 to-orange-600',
      author: 'SalaryWise Team',
      publishDate: '2024-02-01',
      tags: ['international taxes', 'tax systems', 'country comparison', 'tax compliance']
    },
    {
      id: 'salary-trends',
      title: 'Salary Trends 2026 (Global)',
      slug: 'salary-trends-2026-global',
      description: 'Latest global salary trends, forecasts, and insights for 2026 and beyond.',
      excerpt: 'Stay ahead of the curve with 2026 salary trends. Industry insights, geographic variations, and future predictions for compensation growth.',
      icon: '📈',
      readTime: '6 min read',
      category: 'Career',
      popular: true,
      featured: false,
      color: 'from-indigo-500 to-indigo-600',
      author: 'SalaryWise Team',
      publishDate: '2024-02-05',
      tags: ['salary trends', '2026 forecast', 'industry analysis', 'compensation trends']
    }
  ];

  const guideCategories = [
    { name: 'All', count: 5, icon: '📚' },
    { name: 'Tax Basics', count: 2, icon: '💰' },
    { name: 'Calculations', count: 1, icon: '🧮' },
    { name: 'Career', count: 2, icon: '📈' }
  ];

  // Filter guides based on search and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGuide = guides.find(guide => guide.featured);
  const regularGuides = filteredGuides.filter(guide => !guide.featured);

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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Salary Calculation Guides</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                Master salary calculations, tax planning, and financial strategies
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {guideCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category.name
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'bg-blue-500 bg-opacity-30 text-white hover:bg-opacity-40'
                    }`}
                  >
                    <span className="mr-1.5">{category.icon}</span>
                    {category.name}
                    <span className="ml-1.5 bg-blue-600 bg-opacity-50 px-1.5 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Featured Guide */}
          {featuredGuide && !searchTerm && selectedCategory === 'All' && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <h2 className="text-2xl font-bold text-gray-900">Featured Guide</h2>
              </div>

              <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Link href={`/en/${featuredGuide.slug}`} className="block">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-8 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${featuredGuide.color} flex items-center justify-center shadow-lg`}>
                        <div className="text-4xl">{featuredGuide.icon}</div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {featuredGuide.category}
                        </span>
                        <span className="text-gray-500 text-sm">{featuredGuide.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredGuide.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredGuide.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>By {featuredGuide.author}</span>
                            <span>{new Date(featuredGuide.publishDate).toLocaleDateString('en-US')}</span>
                          </div>
                        <div className="text-blue-600 font-semibold hover:text-blue-800">
                          Read Full Guide →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          )}

          {/* All Guides Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'All' ? 'All Guides' : `${selectedCategory} Guides`}
                <span className="text-gray-500 text-lg ml-2">({filteredGuides.length})</span>
              </h2>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or category filter</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Show All Guides
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularGuides.map((guide) => (
                  <article key={guide.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <Link href={`/en/${guide.slug}`} className="block">
                      <div className="p-6">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <div className="text-2xl">{guide.icon}</div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                            {guide.category}
                          </span>
                          <span className="text-gray-500 text-xs">{guide.readTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {guide.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {guide.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {guide.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{new Date(guide.publishDate).toLocaleDateString('en-US')}</span>
                          <span className="text-blue-600 font-medium group-hover:text-blue-800">
                            Read →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Salary Insights</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest salary guides, tax updates, and financial planning tips delivered to your inbox.
              Join thousands of professionals who stay ahead in their careers.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-2">No spam, unsubscribe anytime</p>
            </div>
          </div>

          {/* Quick Access Tools */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Try Our Calculators</h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Put your knowledge into practice with our comprehensive salary calculators
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link
                href="/en/salary-calculator"
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">💰</div>
                <div className="font-semibold text-gray-900 mb-1">Salary Calculator</div>
                <div className="text-sm text-gray-600">Complete salary analysis</div>
              </Link>

              <Link
                href="/en/gross-to-net-salary"
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                <div className="font-semibold text-gray-900 mb-1">Tax Calculator</div>
                <div className="text-sm text-gray-600">Gross to net conversion</div>
              </Link>

              <Link
                href="/en/country"
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🌍</div>
                <div className="font-semibold text-gray-900 mb-1">Country Calculators</div>
                <div className="text-sm text-gray-600">Regional tax rates</div>
              </Link>

              <Link
                href="/en/industry"
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏢</div>
                <div className="font-semibold text-gray-900 mb-1">Industry Tools</div>
                <div className="text-sm text-gray-600">Career-specific calculators</div>
              </Link>
            </div>
          </div>

          {/* Why Choose Our Guides */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Guides?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Expert Knowledge</h4>
                <p className="text-gray-600 text-sm">Written by financial experts with years of experience in salary analysis</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📅</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Always Updated</h4>
                <p className="text-gray-600 text-sm">Latest tax laws, rates, and financial information for 2024</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">💡</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Practical Examples</h4>
                <p className="text-gray-600 text-sm">Real-world calculations and scenarios you can apply immediately</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">🆓</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Free Forever</h4>
                <p className="text-gray-600 text-sm">No subscriptions, no paywalls, always accessible to everyone</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold cursor-pointer text-gray-900 group-hover:text-blue-600">
                    Are these guides free to read?
                  </summary>
                  <p className="mt-3 text-gray-600">Yes, all our salary calculation guides are completely free to read. No registration or subscription required.</p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold cursor-pointer text-gray-900 group-hover:text-blue-600">
                    How often are the guides updated?
                  </summary>
                  <p className="mt-3 text-gray-600">We update our guides annually to reflect changes in tax laws, salary trends, and financial regulations to ensure accuracy.</p>
                </details>
              </div>

              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold cursor-pointer text-gray-900 group-hover:text-blue-600">
                    Can I share these guides?
                  </summary>
                  <p className="mt-3 text-gray-600">Absolutely! Feel free to share our guides with friends, family, or colleagues who might benefit from learning about salary calculations.</p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold cursor-pointer text-gray-900 group-hover:text-blue-600">
                    Do you offer personalized advice?
                  </summary>
                  <p className="mt-3 text-gray-600">Our guides provide general educational information. For personalized financial or tax advice, please consult with qualified professionals.</p>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Browse More Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse More Resources</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/en/"
              className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
              <h4 className="font-bold text-gray-900 mb-2">Home</h4>
              <p className="text-gray-600 text-sm">Explore all our calculators and tools</p>
            </Link>

            <Link
              href="/en/salary-calculator"
              className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧮</div>
              <h4 className="font-bold text-gray-900 mb-2">Calculators</h4>
              <p className="text-gray-600 text-sm">Try our comprehensive salary tools</p>
            </Link>

            <Link
              href="/en/faq"
              className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition-all text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">❓</div>
              <h4 className="font-bold text-gray-900 mb-2">FAQ</h4>
              <p className="text-gray-600 text-sm">Get answers to common questions</p>
            </Link>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-20 md:hidden shadow-lg">
          <div className="flex justify-around">
            <Link href="/en/" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <span className="text-xl">🏠</span>
              <span className="text-xs font-medium mt-1">Home</span>
            </Link>
            <Link href="/en/salary-calculator" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <span className="text-xl">🧮</span>
              <span className="text-xs font-medium mt-1">Calculator</span>
            </Link>
            <Link href="/en/guides" className="flex flex-col items-center p-2 text-blue-600">
              <span className="text-xl">📚</span>
              <span className="text-xs font-medium mt-1">Guides</span>
            </Link>
          </div>
        </div>

        <div className="h-20 md:hidden"></div>
      </div>
    </>
  );
}
