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

// Supported locales
const supportedLocales = ['en', 'es', 'fr'];

// All available page slugs - Phase 1 (45 pages)
const availablePages = [
  // Core Calculator Pages (10)
  'salary-calculator',
  'gross-to-net-salary',
  'net-to-gross-salary',
  'take-home-pay-calculator',
  'hourly-to-salary-calculator',
  'bonus-calculator',
  'overtime-pay-calculator',
  'salary-after-tax-calculator',
  'annual-raise-calculator',
  'salary-comparison-calculator',
  // Industry-Specific Calculators (10)
  'salary-calculator-it-tech',
  'salary-calculator-healthcare',
  'salary-calculator-engineering',
  'salary-calculator-teacher',
  'salary-calculator-finance-banking',
  'salary-calculator-retail',
  'salary-calculator-construction',
  'salary-calculator-legal',
  'salary-calculator-marketing-sales',
  'salary-calculator-startup-entrepreneur',
  // Financial & Planning Calculators (8)
  'loan-emi-calculator',
  'salary-vs-expenses-calculator',
  'take-home-vs-cost-of-living-calculator',
  'overtime-bonus-tax-calculator',
  'annual-raise-promotion-calculator',
  'salary-vs-freelance-income-calculator',
  'savings-from-salary-calculator',
  'retirement-contribution-calculator',
  // Educational Guides (5)
  'how-to-calculate-take-home-pay',
  'understanding-gross-vs-net-salary',
  'salary-negotiation-tips',
  'taxes-explained-by-country',
  'salary-trends-2026-global',
  // Country-Specific Calculators (15)
  'salary-after-tax-usa',
  'salary-after-tax-uk',
  'salary-after-tax-ireland',
  'salary-calculator-usa',
  'salary-calculator-uk',
  'salary-calculator-ireland',
  'salary-calculator-canada',
  'salary-calculator-australia',
  'salary-calculator-germany',
  'salary-calculator-france',
  'salary-calculator-spain',
  'salary-calculator-india',
  'salary-calculator-singapore',
  'salary-calculator-netherlands',
  'salary-calculator-sweden',
  'salary-calculator-switzerland',
  'salary-calculator-new-zealand',
  'salary-calculator-south-africa',
  // Directory pages
  'country',
  'industry',
  'guides'
];

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of supportedLocales) {
    for (const slug of availablePages) {
      params.push({ locale, slug });
    }
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

    // Load page data based on slug type
    try {
      if (slug.startsWith('country/')) {
        // Country pages: src/locales/${locale}/country/${country}.json
        const country = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/country/${country}.json`);
      } else if (slug.startsWith('industry/')) {
        // Industry pages: src/locales/${locale}/industry/${industry}.json
        const industry = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/industry/${industry}.json`);
      } else if (slug.startsWith('guides/')) {
        // Guide pages: src/locales/${locale}/guides/${guide}.json
        const guide = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/guides/${guide}.json`);
      } else {
        // Basic calculator pages: src/locales/${locale}/${slug}.json
        pageData = require(`../../../locales/${locale}/${slug}.json`);
      }
    } catch (fileError) {
      console.error(`Failed to load page data for ${slug}:`, fileError);
      // Fallback metadata
      return {
        title: 'Salary Calculator',
        description: 'Free salary calculators and financial tools',
      };
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

    // Load page data using require (works with static export)
    try {
      if (slug.startsWith('country/')) {
        // Country pages: src/locales/${locale}/country/${country}.json
        const country = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/country/${country}.json`);
      } else if (slug.startsWith('industry/')) {
        // Industry pages: src/locales/${locale}/industry/${industry}.json
        const industry = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/industry/${industry}.json`);
      } else if (slug.startsWith('guides/')) {
        // Guide pages: src/locales/${locale}/guides/${guide}.json
        const guide = slug.split('/')[1];
        pageData = require(`../../../locales/${locale}/guides/${guide}.json`);
      } else {
        // Basic calculator pages: src/locales/${locale}/${slug}.json
        pageData = require(`../../../locales/${locale}/${slug}.json`);
      }
    } catch (fileError) {
      console.error(`Failed to load page data for ${slug}:`, fileError);
      throw new Error(`Page data not found for: ${slug}`);
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
  return (
    <>
      <Head>
        <title>Salary Guides & Tips | Compensation Advice | SalaryWise.io</title>
        <meta name="description" content="Comprehensive guides on salary negotiation, tax planning, career advancement, and compensation strategies. Free expert advice for job seekers and professionals." />
        <meta name="keywords" content="salary guide, compensation advice, salary negotiation tips, career advancement, pay advice" />
        <link rel="canonical" href={`https://salarywise.io/${locale}/guides`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Salary Guides & Tips</h1>
                <p className="text-gray-600 mt-1">Expert advice for maximizing your compensation</p>
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
              Understanding salary, taxes, and compensation is crucial for financial success. Our comprehensive guides cover everything from salary negotiation strategies to tax optimization techniques.
            </p>
            <p className="text-gray-700">
              Whether you're looking for a new job, negotiating a raise, or planning your career, our expert guides provide actionable advice to help you maximize your earning potential.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-6">Guide Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Salary Negotiation</h3>
              <p className="text-gray-600 mb-4">Learn proven strategies to negotiate higher pay and better benefits</p>
              <div className="space-y-3">
                <Link
                  href={`/${locale}/guides/salary-negotiation`}
                  className="block p-3 border border-gray-200 rounded hover:border-blue-300 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Salary Negotiation Tips</h4>
                  <p className="text-sm text-gray-600 mt-1">Master the art of negotiating job offers and raises</p>
                  <div className="text-blue-600 text-sm mt-2">8 min read</div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tax & Finance</h3>
              <p className="text-gray-600 mb-4">Understand taxes, deductions, and financial planning</p>
              <div className="space-y-3">
                <Link
                  href={`/${locale}/guides/gross-vs-net`}
                  className="block p-3 border border-gray-200 rounded hover:border-blue-300 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Gross vs Net Salary</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn the difference between gross and net pay</p>
                  <div className="text-blue-600 text-sm mt-2">6 min read</div>
                </Link>
                <Link
                  href={`/${locale}/guides/how-to-calculate-take-home`}
                  className="block p-3 border border-gray-200 rounded hover:border-blue-300 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">How to Calculate Take-Home Pay</h4>
                  <p className="text-sm text-gray-600 mt-1">Step-by-step guide to calculating net salary</p>
                  <div className="text-blue-600 text-sm mt-2">10 min read</div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Development</h3>
              <p className="text-gray-600 mb-4">Advance your career and increase your earning potential</p>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded bg-gray-50">
                  <h4 className="font-medium text-gray-500">Coming Soon</h4>
                  <p className="text-sm text-gray-400 mt-1">Career advancement strategies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Explore Our Guides?</h2>
            <p className="mb-4">Select a guide above to learn more about maximizing your compensation.</p>
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
              href={`/${locale}/country/canada`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇨🇦</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Canada</h3>
                <p className="text-gray-600 text-sm mb-3">Federal and provincial income tax, CPP, EI contributions</p>
                <div className="text-blue-600 font-medium text-sm">Federal: 15-29%, Provincial: 5-20.5%</div>
                <div className="mt-3 text-blue-600 font-medium">Calculate →</div>
              </div>
            </Link>

            <Link
              href={`/${locale}/country/australia`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇦🇺</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Australia</h3>
                <p className="text-gray-600 text-sm mb-3">Income tax, superannuation guarantee, Medicare levy</p>
                <div className="text-blue-600 font-medium text-sm">Income tax: 0-45%, Super: 10%</div>
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

            <Link
              href={`/${locale}/country/india`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🇮🇳</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">India</h3>
                <p className="text-gray-600 text-sm mb-3">Income tax, professional tax, provident fund contributions</p>
                <div className="text-blue-600 font-medium text-sm">Income tax: 0-30%, PF: 12%</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href={`/${locale}/industry/it`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-blue-600 text-xl">💻</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Technology & IT</h3>
                  <p className="text-gray-600 text-sm mb-3">Software development, cybersecurity, data science, and tech roles</p>
                  <div className="space-y-1 text-sm">
                    <div><strong>Average Salary:</strong> $85,000 - $150,000</div>
                    <div><strong>Growth:</strong> High demand, 13% growth projected</div>
                  </div>
                  <div className="mt-3 text-blue-600 font-medium">Learn More →</div>
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/industry/healthcare`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-blue-600 text-xl">🏥</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Healthcare</h3>
                  <p className="text-gray-600 text-sm mb-3">Doctors, nurses, medical technicians, and healthcare professionals</p>
                  <div className="space-y-1 text-sm">
                    <div><strong>Average Salary:</strong> $60,000 - $200,000</div>
                    <div><strong>Growth:</strong> Strong demand, 16% growth projected</div>
                  </div>
                  <div className="mt-3 text-blue-600 font-medium">Learn More →</div>
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/industry/finance`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-blue-600 text-xl">💰</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Finance & Banking</h3>
                  <p className="text-gray-600 text-sm mb-3">Investment banking, financial analysis, accounting, and financial services</p>
                  <div className="space-y-1 text-sm">
                    <div><strong>Average Salary:</strong> $70,000 - $180,000</div>
                    <div><strong>Growth:</strong> Stable demand, 7% growth projected</div>
                  </div>
                  <div className="mt-3 text-blue-600 font-medium">Learn More →</div>
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/industry/engineering`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-blue-600 text-xl">⚙️</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Engineering</h3>
                  <p className="text-gray-600 text-sm mb-3">Mechanical, electrical, civil, and other engineering disciplines</p>
                  <div className="space-y-1 text-sm">
                    <div><strong>Average Salary:</strong> $75,000 - $130,000</div>
                    <div><strong>Growth:</strong> Moderate demand, 6% growth projected</div>
                  </div>
                  <div className="mt-3 text-blue-600 font-medium">Learn More →</div>
                </div>
              </div>
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