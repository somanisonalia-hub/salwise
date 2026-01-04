import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { DynamicPageClient } from '../../../components';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Supported locales - Temporarily disabled ES/FR for performance optimization
const supportedLocales = ['en'];

// All available page slugs - Phase 1 AdSense-ready (35 pages)
const availablePages = [
  // Ireland Calculators (5 pages)
  'ireland-salary-calculator',
  'ireland-hourly-to-salary',
  'ireland-overtime-pay',
  'ireland-bonus-tax',
  'ireland-contractor-salary-calculator',

  // UK Calculators (5 pages)
  'uk-salary-calculator',
  'uk-hourly-to-salary',
  'uk-overtime-pay',
  'uk-bonus-tax',
  'uk-contractor-salary-calculator',

  // USA Calculators (5 pages)
  'usa-salary-calculator',
  'usa-hourly-to-salary',
  'usa-overtime-pay',
  'usa-bonus-tax',
  'usa-contractor-salary-calculator',

  // Global Calculators (4 pages)
  'salary-calculator',
  'gross-to-net-salary',
  'take-home-pay-calculator',
  'salary-after-tax-calculator',

  // Essential Informational / Guidance Pages (17 pages)
  'about',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'disclaimer',
  'cookies',
  'faq',
  'how-salary-calculators-work',
  'salary-guide',
  'guides',
  'country',
  'industry',
  'understanding-gross-vs-net-salary',
  'sitemap'
];

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  // Only generate for English locale for maximum performance
  for (const slug of availablePages) {
    params.push({ locale: 'en', slug });
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!supportedLocales.includes(locale) || !availablePages.includes(slug)) {
    return {};
  }

  try {
    let pageData;

    // Load page data based on slug type - always fall back to English
    let filePath = '';
    if (slug.startsWith('country/')) {
      const country = slug.split('/')[1];
      filePath = `../../../locales/${locale}/country/${country}.json`;
    } else if (slug.startsWith('industry/')) {
      const industry = slug.split('/')[1];
      filePath = `../../../locales/${locale}/industry/${industry}.json`;
    } else if (slug.startsWith('guides/')) {
      const guide = slug.split('/')[1];
      filePath = `../../../locales/${locale}/guides/${guide}.json`;
    } else {
      filePath = `../../../locales/${locale}/${slug}.json`;
    }

    try {
      pageData = require(filePath);
    } catch (fileError) {
      // Try English fallback
      try {
        if (slug.startsWith('country/')) {
          const country = slug.split('/')[1];
          pageData = require(`../../../locales/en/country/${country}.json`);
        } else if (slug.startsWith('industry/')) {
          const industry = slug.split('/')[1];
          pageData = require(`../../../locales/en/industry/${industry}.json`);
        } else if (slug.startsWith('guides/')) {
          const guide = slug.split('/')[1];
          pageData = require(`../../../locales/en/guides/${guide}.json`);
        } else if (slug === 'country') {
          pageData = require('../../../locales/en/country/index.json');
        } else if (slug === 'industry') {
          pageData = require('../../../locales/en/industry/index.json');
        } else if (slug === 'guides') {
          pageData = require('../../../locales/en/guides/index.json');
        } else {
          pageData = require(`../../../locales/en/${slug}.json`);
        }
      } catch (englishError) {
        console.error(`Failed to load page data for ${slug} in both ${locale} and English:`, englishError);
        // Fallback metadata
        return {
          title: 'Salary Calculator',
          description: 'Free salary calculators and financial tools',
        };
      }
    }

    pageData = pageData.default || pageData;

    return {
      title: pageData.title || pageData.metaTitle,
      description: pageData.description || pageData.metaDescription,
      keywords: pageData.keywords || [pageData.primaryKeyword, ...pageData.longTailKeywords].join(', '),
      openGraph: {
        title: pageData.title || pageData.metaTitle,
        description: pageData.description || pageData.metaDescription,
        type: 'website',
      },
      alternates: {
        canonical: `https://salarywise.io/${locale}/${slug}`,
        languages: {
          'en': `https://salarywise.io/en/${slug}`,
          'es': `https://salarywise.io/es/${slug}`,
          'fr': `https://salarywise.io/fr/${slug}`,
        },
      },
    };
  } catch (error) {
    // Fallback to English if translation not available
    try {
      const pageData = await import(`../../../locales/en/${slug}.json`);

      return {
        title: pageData.metaTitle,
        description: pageData.metaDescription,
        keywords: [pageData.primaryKeyword, ...pageData.longTailKeywords].join(', '),
        openGraph: {
          title: pageData.metaTitle,
          description: pageData.metaDescription,
          type: 'website',
        },
        alternates: {
          canonical: `https://salarywise.io/${locale}/${slug}`,
          languages: {
            'en': `https://salarywise.io/en/${slug}`,
            'es': `https://salarywise.io/es/${slug}`,
            'fr': `https://salarywise.io/fr/${slug}`,
          },
        },
      };
    } catch (fallbackError) {
      // Return basic metadata if page data not found
      return {
        title: 'Salary Calculator | SalaryWise.io',
        description: 'Free salary calculators and financial tools.',
      };
    }
  }
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // DEBUG: Log the route parameters
  console.log('LocalizedPage called with locale:', locale, 'slug:', slug);

  if (!supportedLocales.includes(locale) || !availablePages.includes(slug)) {
    console.log('Not found: locale in supported:', supportedLocales.includes(locale), 'slug in available:', availablePages.includes(slug));
    notFound();
  }

  // Handle directory pages
  if (slug === 'guides') {
    return <GuidesDirectory locale={locale} />;
  }
  if (slug === 'country') {
    return <CountryDirectory locale={locale} />;
  }
  if (slug === 'industry') {
    return <IndustryDirectory locale={locale} />;
  }


  // For calculator pages, load data and use the DynamicPageClient
  try {
    let pageData;

    // Load page data using require (works with static export) - always fall back to English
    let filePath = '';
    if (slug.startsWith('country/')) {
      const country = slug.split('/')[1];
      filePath = `../../../locales/${locale}/country/${country}.json`;
    } else if (slug.startsWith('industry/')) {
      const industry = slug.split('/')[1];
      filePath = `../../../locales/${locale}/industry/${industry}.json`;
    } else if (slug.startsWith('guides/')) {
      const guide = slug.split('/')[1];
      filePath = `../../../locales/${locale}/guides/${guide}.json`;
    } else {
      filePath = `../../../locales/${locale}/${slug}.json`;
    }

    try {
      pageData = require(filePath);
    } catch (fileError) {
      // Try English fallback
      try {
        if (slug.startsWith('country/')) {
          const country = slug.split('/')[1];
          pageData = require(`../../../locales/en/country/${country}.json`);
        } else if (slug.startsWith('industry/')) {
          const industry = slug.split('/')[1];
          pageData = require(`../../../locales/en/industry/${industry}.json`);
        } else if (slug.startsWith('guides/')) {
          const guide = slug.split('/')[1];
          pageData = require(`../../../locales/en/guides/${guide}.json`);
        } else if (slug === 'country') {
          pageData = require('../../../locales/en/country/index.json');
        } else if (slug === 'industry') {
          pageData = require('../../../locales/en/industry/index.json');
        } else if (slug === 'guides') {
          pageData = require('../../../locales/en/guides/index.json');
        } else {
          pageData = require(`../../../locales/en/${slug}.json`);
        }
      } catch (englishError) {
        console.error(`Failed to load page data for ${slug} in both ${locale} and English:`, englishError);
        throw new Error(`Page data not found for: ${slug}`);
      }
    }

    pageData = pageData.default || pageData;

    // Calculator data will be loaded client-side using getCalculator

    return <DynamicPageClient pageData={pageData} calculatorData={undefined} />;
  } catch (error) {
    console.error('Error loading page data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-8">The page data could not be loaded.</p>
          <p className="text-sm text-gray-500 mt-4">Slug: {slug}, Locale: {locale}</p>
          <p className="text-sm text-red-500 mt-2">Error: {errorMessage}</p>
        </div>
      </div>
    );
}
}

// Directory Components
async function GuidesDirectory({ locale }: { locale: string }) {
  // Load the guides data from JSON
  const guidesData = require(`../../../locales/${locale}/guides/index.json`);

  return (
    <>
      <Head>
        <title>Salary & Tax Guides | SalaryWise.io</title>
        <meta name="description" content="Expert salary and tax guides for understanding compensation, taxes, and career planning." />
        <meta name="keywords" content="salary guides, tax guides, career advice, salary planning" />
        <link rel="canonical" href={`https://salarywise.io/${locale}/guides`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{guidesData.header.title}</h1>
                <p className="text-gray-600 mt-1">{guidesData.header.subtitle}</p>
              </div>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Intro */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-4">{guidesData.intro.paragraph1}</p>
            <p className="text-gray-700">{guidesData.intro.paragraph2}</p>
          </div>

          {/* Guides List */}
          <div className="space-y-4">
            {guidesData.guides.map((guide: any, index: number) => (
              <Link
                key={index}
                href={guide.href}
                className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{guide.category}</span>
                      <span>{guide.readTime}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">{guidesData.calculatorsCta.title}</h3>
            <p className="text-blue-800 mb-4">{guidesData.calculatorsCta.content}</p>
            <div className="flex gap-4">
              <Link
                href={`/${locale}/salary-calculator`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try Salary Calculator
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function CountryDirectory({ locale }: { locale: string }) {
  return (
    <>
      <Head>
        <title>Country Salary Calculators | International Tax Calculators | SalaryWise.io</title>
        <meta name="description" content="Calculate take-home pay for different countries with localized tax rules. Compare salaries across the US, UK, Canada, Australia, and more." />
        <meta name="keywords" content="country salary calculator, international tax calculator, global salary comparison, localized tax rules" />
        <link rel="canonical" href={`https://salarywise.io/${locale}/country`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Country Salary Calculators</h1>
                <p className="text-gray-600 mt-1">Calculate take-home pay with local tax rules</p>
              </div>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Understanding your take-home pay varies significantly by country due to different tax systems, social contributions, and local regulations. Our country-specific calculators help you understand your net income anywhere in the world.
            </p>
            <p className="text-gray-700">
              Select your country below to get accurate salary calculations based on local tax laws and regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link
              href={`/${locale}/country/usa`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇺🇸</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">United States</h3>
                <p className="text-gray-600 text-sm mb-3">Federal income tax, state taxes, Social Security, Medicare</p>
                <div className="text-blue-600 font-medium text-sm">Federal: 10-37%, State: 0-13.3%</div>
                <div className="mt-3 text-blue-600 font-medium">Calculate →</div>
              </div>
            </Link>

            <Link
              href={`/${locale}/country/uk`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇬🇧</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">United Kingdom</h3>
                <p className="text-gray-600 text-sm mb-3">Income tax, National Insurance, student loan repayments</p>
                <div className="text-blue-600 font-medium text-sm">Income tax: 0-45%, NI: 8-12%</div>
                <div className="mt-3 text-blue-600 font-medium">Calculate →</div>
              </div>
            </Link>


            <Link
              href={`/${locale}/country/ireland`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇮🇪</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ireland</h3>
                <p className="text-gray-600 text-sm mb-3">Income tax, Universal Social Charge, PRSI contributions</p>
                <div className="text-blue-600 font-medium text-sm">Income tax: 0-40%, USC: 0.5-8%</div>
                <div className="mt-3 text-blue-600 font-medium">Calculate →</div>
              </div>
            </Link>

          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Don't See Your Country?</h2>
            <p className="mb-4">We're constantly adding new countries. Contact us to request your country's calculator.</p>
            <Link
              href={`/${locale}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function IndustryDirectory({ locale }: { locale: string }) {
  return (
    <>
      <Head>
        <title>Industry Salary Guides | Career Salary Information | SalaryWise.io</title>
        <meta name="description" content="Explore salary information by industry. Compare compensation across technology, healthcare, finance, engineering, and other sectors." />
        <meta name="keywords" content="industry salary guide, career salary information, industry compensation, sector salary comparison" />
        <link rel="canonical" href={`https://salarywise.io/${locale}/industry`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Industry Salary Guides</h1>
                <p className="text-gray-600 mt-1">Explore salaries by career sector</p>
              </div>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Salaries vary significantly across different industries due to factors like demand, required skills, education, and market conditions. Understanding industry-specific compensation helps you make informed career decisions and negotiate better pay.
            </p>
            <p className="text-gray-700">
              Browse our industry guides to learn about typical salaries, growth opportunities, and key factors that influence compensation in your field.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Industry Salary Information</h3>
            <p className="text-blue-800 mb-4">
              Salaries vary significantly across industries. Use our industry salary comparison tool to understand how your field affects compensation.
            </p>
            <Link
              href={`/${locale}/industry`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compare Industry Salaries →
            </Link>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Explore Your Industry?</h2>
            <p className="mb-4">Select an industry above to learn more about typical salaries, growth opportunities, and career paths.</p>
            <Link
              href={`/${locale}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function GuidePage({ slug, locale }: { slug: string; locale: string }) {
  let content;
  try {
    if (slug.startsWith('guides/')) {
      const guide = slug.split('/')[1];
      if (locale === 'en') {
        content = require(`../../../locales/en/guides/${guide}.json`);
      } else {
        try {
          content = require(`../../../locales/${locale}/guides/${guide}.json`);
        } catch {
          content = require(`../../../locales/en/guides/${guide}.json`);
        }
      }
    }
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-8">The guide you're looking for doesn't exist.</p>
          <Link href={`/${locale}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={content.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData || {}) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{content.header?.title || content.h1}</h1>
                <p className="text-gray-600 mt-1">{content.header?.subtitle || 'Guide'}</p>
              </div>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {content.intro && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <p className="text-gray-700 mb-4">{content.intro.paragraph1}</p>
              <p className="text-gray-700">{content.intro.paragraph2}</p>
            </div>
          )}

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Guide Content</h2>
            <p className="mb-4">This guide is being developed. Check back soon!</p>
            <Link
              href={`/${locale}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
