import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { DynamicPageClient } from '../../../components';

interface PageProps {
  params: Promise<{
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
  const params: Array<{ slug: string }> = [];

  // Generate static params for all available pages
  for (const slug of availablePages) {
    params.push({ slug });
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const locale = 'en'; // English-only route

  if (!availablePages.includes(slug)) {
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
  const { slug } = await params;
  const locale = 'en'; // English-only route

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


  // Special handling for enhanced calculator pages
  if (slug === 'usa-salary-calculator') {
    const pageData = require(`../../../locales/${locale}/usa-salary-calculator.json`);
    const { calculateResults } = require('../../../lib/calculatorEngine');

    const states = [
      { name: "California", rate: "13.3%", abbr: "CA" },
      { name: "New York", rate: "8.82%", abbr: "NY" },
      { name: "Texas", rate: "0%", abbr: "TX" },
      { name: "Florida", rate: "0%", abbr: "FL" },
      { name: "Illinois", rate: "4.95%", abbr: "IL" },
      { name: "Pennsylvania", rate: "3.07%", abbr: "PA" },
      { name: "Ohio", rate: "0%", abbr: "OH" },
      { name: "Georgia", rate: "5.75%", abbr: "GA" }
    ];

    const taxBreakdownTable = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">State Income Tax Comparison</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {states.map((state) => (
            <div key={state.abbr} className="text-center p-3 bg-gray-50 rounded">
              <div className="font-semibold text-gray-900">{state.name}</div>
              <div className="text-lg font-bold text-blue-600">{state.rate}</div>
              <div className="text-xs text-gray-600">tax rate</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 text-sm text-center">
            💡 <strong>9 states have no income tax:</strong> Texas, Florida, Nevada, Washington, Wyoming, South Dakota, Alaska, Tennessee, New Hampshire
          </p>
        </div>
      </div>
    );

    const federalTaxTable = (
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">2026 US Federal Tax Brackets (Single Filer)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Income Range</th>
                <th className="text-left py-2 font-semibold">Tax Rate</th>
                <th className="text-left py-2 font-semibold">Tax Owed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2">$0 - $11,600</td>
                <td className="py-2">10%</td>
                <td className="py-2">$0 - $1,160</td>
              </tr>
              <tr>
                <td className="py-2">$11,601 - $47,150</td>
                <td className="py-2">12%</td>
                <td className="py-2">$1,161 - $5,426</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="py-2">$47,151 - $100,525</td>
                <td className="py-2 font-semibold text-blue-600">22%</td>
                <td className="py-2">$5,427 - $18,715</td>
              </tr>
              <tr>
                <td className="py-2">$100,526 - $191,950</td>
                <td className="py-2">24%</td>
                <td className="py-2">$18,716 - $39,826</td>
              </tr>
              <tr>
                <td className="py-2">$191,951+</td>
                <td className="py-2">32%</td>
                <td className="py-2">$39,827+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    const educationalContent = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding US Tax System</h3>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p className="mb-3">
            The US tax system includes <strong>federal income tax</strong> (bracketed rates), <strong>FICA taxes</strong> (Social Security + Medicare),
            and optional <strong>state income taxes</strong>. Understanding these components helps you maximize your take-home pay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="bg-red-50 p-4 rounded border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Federal Income Tax</h4>
              <p className="text-sm text-red-800">Progressive tax brackets from 10% to 37%. Based on taxable income after deductions.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">FICA Taxes (7.65%)</h4>
              <p className="text-sm text-blue-800">Social Security (6.2%) + Medicare (1.45%). Funds retirement and healthcare programs.</p>
            </div>
            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">State Income Tax</h4>
              <p className="text-sm text-green-800">Varies by state from 0% (TX, FL) to 13.3% (CA). Additional tax on top of federal.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
            <p className="text-yellow-800">
              <strong>💡 Pro Tip:</strong> Use the standard deduction ($14,600 for single filers in 2024) to reduce your taxable income.
              Consider contributing to pre-tax retirement accounts to lower your tax burden.
            </p>
          </div>
        </div>
      </div>
    );

    const { default: EnhancedCalculator } = await import('../../../components/EnhancedCalculator');
    return (
      <EnhancedCalculator
        pageData={pageData}
        calculatorId="usaSalaryCalculator"
        educationalContent={educationalContent}
        taxBreakdownTable={
          <>
            {taxBreakdownTable}
            {federalTaxTable}
          </>
        }
      />
    );
  }

  // Special handling for Ireland salary calculator
  if (slug === 'ireland-salary-calculator') {
    const pageData = require(`../../../locales/${locale}/ireland-salary-calculator.json`);
    const { calculateResults } = require('../../../lib/calculatorEngine');

    const taxBreakdownTable = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Irish Tax System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Income Tax</h4>
            <p className="text-sm text-green-800">Progressive tax brackets from 0% to 40%. Based on taxable income.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Universal Social Charge (USC)</h4>
            <p className="text-sm text-blue-800">0.5% to 8% on gross income. Additional social insurance.</p>
          </div>
          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Pay Related Social Insurance (PRSI)</h4>
            <p className="text-sm text-orange-800">4% employee contribution for social welfare benefits.</p>
          </div>
        </div>
      </div>
    );

    const educationalContent = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding Irish Tax System</h3>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p className="mb-3">
            Ireland's tax system consists of <strong>income tax</strong>, <strong>Universal Social Charge (USC)</strong>,
            and <strong>Pay Related Social Insurance (PRSI)</strong>. Tax credits and reliefs can significantly reduce your tax burden.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
            <p className="text-yellow-800">
              <strong>💡 Key Benefits:</strong> Ireland offers attractive tax incentives for certain income types and has relatively low corporate tax rates.
              Many expatriates benefit from the double taxation agreements with other countries.
            </p>
          </div>
        </div>
      </div>
    );

    const { default: EnhancedCalculator } = await import('../../../components/EnhancedCalculator');
    return (
      <EnhancedCalculator
        pageData={pageData}
        calculatorId="irelandSalaryCalculator"
        educationalContent={educationalContent}
        taxBreakdownTable={taxBreakdownTable}
      />
    );
  }

  // Special handling for UK salary calculator
  if (slug === 'uk-salary-calculator') {
    const pageData = require(`../../../locales/${locale}/uk-salary-calculator.json`);
    const { calculateResults } = require('../../../lib/calculatorEngine');

    const taxBreakdownTable = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">UK Tax System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Income Tax</h4>
            <p className="text-sm text-green-800">Progressive tax brackets from 0% to 45%. Personal allowance applies.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">National Insurance</h4>
            <p className="text-sm text-blue-800">8% to 12% for social security and healthcare benefits.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Student Loan Repayment</h4>
            <p className="text-sm text-purple-800">9% of income over threshold if you have student loans.</p>
          </div>
        </div>
      </div>
    );

    const educationalContent = (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding UK Tax System</h3>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p className="mb-3">
            The UK tax system includes <strong>income tax</strong>, <strong>National Insurance contributions</strong>,
            and potentially <strong>student loan repayments</strong>. The personal allowance and tax-free thresholds are key to understanding take-home pay.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
            <p className="text-yellow-800">
              <strong>💡 Pro Tip:</strong> Maximize your personal allowance and consider pension contributions to reduce taxable income.
              The UK has generous tax reliefs for certain expenses and charitable donations.
            </p>
          </div>
        </div>
      </div>
    );

    const { default: EnhancedCalculator } = await import('../../../components/EnhancedCalculator');
    return (
      <EnhancedCalculator
        pageData={pageData}
        calculatorId="ukSalaryCalculator"
        educationalContent={educationalContent}
        taxBreakdownTable={taxBreakdownTable}
      />
    );
  }

  // Special handling for global enhanced calculators
  if (slug === 'salary-calculator' || slug === 'gross-to-net-salary' || slug === 'take-home-pay-calculator' || slug === 'salary-after-tax-calculator') {
    const pageData = require(`../../../locales/${locale}/${slug}.json`);

    // Define calculator ID based on slug
    let calculatorId = '';
    let educationalContent = null;
    let taxBreakdownTable = null;

    if (slug === 'salary-calculator') {
      calculatorId = 'globalSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Global Salary Comparison</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Compare take-home pay across Ireland, USA, and UK with our comprehensive global salary calculator.
              See how different tax systems affect your net income and make informed decisions about international opportunities.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-4">
              <p className="text-blue-800">
                <strong>💡 Global Insight:</strong> Tax rates, social contributions, and currency values all impact your take-home pay differently across countries.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'gross-to-net-salary') {
      calculatorId = 'grossToNet';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Understanding Gross vs Net Salary</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              <strong>Gross salary</strong> is your total earnings before any deductions. This includes your base pay, bonuses, overtime, and other compensation.
            </p>
            <p className="mb-3">
              <strong>Net salary</strong> is what you actually receive after taxes, social contributions, and other withholdings are subtracted.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
              <p className="text-yellow-800">
                <strong>💡 Key Difference:</strong> Gross salary shows your total compensation value, while net salary shows your spending power.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'take-home-pay-calculator') {
      calculatorId = 'takeHomePay';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Take-Home Pay Calculation</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Take-home pay is your net salary after all mandatory deductions. This includes income tax, social security contributions,
              healthcare contributions, and other withholdings required by law.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h4 className="font-semibold text-green-900 mb-1">What's Deducted</h4>
                <ul className="text-sm text-green-800 list-disc list-inside">
                  <li>Income tax</li>
                  <li>Social security</li>
                  <li>Healthcare contributions</li>
                  <li>Pension contributions</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-1">What You Keep</h4>
                <ul className="text-sm text-blue-800 list-disc list-inside">
                  <li>Net salary</li>
                  <li>Tax-free allowances</li>
                  <li>Tax credits</li>
                  <li>Voluntary deductions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'salary-after-tax-calculator') {
      calculatorId = 'irelandSalaryCalculator';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Salary After Tax Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              This calculator helps you understand how much of your salary remains after tax deductions.
              Essential for budgeting, financial planning, and understanding your true earning power.
            </p>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded mt-4">
              <p className="text-purple-800">
                <strong>💡 Tax Planning Tip:</strong> Understanding your effective tax rate helps you make informed decisions about investments, deductions, and retirement planning.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const { default: EnhancedCalculator } = await import('../../../components/EnhancedCalculator');
    return (
      <EnhancedCalculator
        pageData={pageData}
        calculatorId={calculatorId}
        educationalContent={educationalContent}
        taxBreakdownTable={taxBreakdownTable}
      />
    );
  }

  // Special handling for country-specific enhanced calculators (hourly, overtime, bonus, contractor)
  const countryCalculatorPatterns = [
    'ireland-hourly-to-salary', 'ireland-overtime-pay', 'ireland-bonus-tax', 'ireland-contractor-salary-calculator',
    'uk-hourly-to-salary', 'uk-overtime-pay', 'uk-bonus-tax', 'uk-contractor-salary-calculator',
    'usa-hourly-to-salary', 'usa-overtime-pay', 'usa-bonus-tax', 'usa-contractor-salary-calculator'
  ];

  if (countryCalculatorPatterns.includes(slug)) {
    const pageData = require(`../../../locales/${locale}/${slug}.json`);

    // Define calculator ID based on slug
    let calculatorId = '';
    let educationalContent = null;
    let taxBreakdownTable = null;

    if (slug === 'ireland-hourly-to-salary') {
      calculatorId = 'irelandHourlyToSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Ireland Hourly to Salary Conversion</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Convert your hourly wage to annual salary in Ireland. This calculator accounts for standard working hours
              and helps you understand your total compensation value.
            </p>
            <div className="bg-green-50 border border-green-200 p-4 rounded mt-4">
              <p className="text-green-800">
                <strong>💡 Ireland Fact:</strong> Standard working week is typically 39 hours, but many roles work 40+ hours.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'ireland-overtime-pay') {
      calculatorId = 'irelandOvertimePay';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Ireland Overtime Pay Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate overtime pay in Ireland. Most employment contracts provide 1.5x or 2x normal hourly rate for overtime hours.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-4">
              <p className="text-blue-800">
                <strong>💡 Legal Note:</strong> Overtime rates are governed by employment contracts and sectoral agreements.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'ireland-bonus-tax') {
      calculatorId = 'irelandBonusTax';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Ireland Bonus Tax Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate tax on bonus payments in Ireland. Bonuses are taxed at your marginal income tax rate plus USC and PRSI.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
              <p className="text-yellow-800">
                <strong>💡 Tax Planning:</strong> Bonus payments are included in your taxable income for the year they're paid.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'ireland-contractor-salary-calculator') {
      calculatorId = 'irelandContractorSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Ireland Contractor Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate contractor rates and take-home pay in Ireland. Includes corporation tax, VAT, and personal tax calculations for limited companies.
            </p>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded mt-4">
              <p className="text-purple-800">
                <strong>💡 Contractor Tip:</strong> Consider using a limited company structure to optimize tax efficiency.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'uk-hourly-to-salary') {
      calculatorId = 'ukHourlyToSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">UK Hourly to Salary Conversion</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Convert your hourly wage to annual salary in the UK. This calculator accounts for standard working hours and holiday pay considerations.
            </p>
            <div className="bg-green-50 border border-green-200 p-4 rounded mt-4">
              <p className="text-green-800">
                <strong>💡 UK Fact:</strong> Standard working week is 40 hours, with 5.6 weeks statutory holiday per year.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'uk-overtime-pay') {
      calculatorId = 'ukOvertimePay';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">UK Overtime Pay Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate overtime pay in the UK. Standard overtime rates are typically 1.5x or 2x your normal hourly rate.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-4">
              <p className="text-blue-800">
                <strong>💡 Legal Note:</strong> Overtime pay is governed by employment contracts and the Working Time Regulations.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'uk-bonus-tax') {
      calculatorId = 'ukBonusTax';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">UK Bonus Tax Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate tax on bonus payments in the UK. Bonuses are taxed at your marginal income tax rate plus National Insurance.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
              <p className="text-yellow-800">
                <strong>💡 Tax Planning:</strong> Consider the timing of bonus payments for optimal tax efficiency.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'uk-contractor-salary-calculator') {
      calculatorId = 'ukContractorSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">UK Contractor Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate contractor rates and take-home pay in the UK. Includes corporation tax, VAT, and personal tax calculations for limited companies.
            </p>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded mt-4">
              <p className="text-purple-800">
                <strong>💡 Contractor Tip:</strong> IR35 legislation affects how contractors are taxed in the UK.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'usa-hourly-to-salary') {
      calculatorId = 'usaHourlyToSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">USA Hourly to Salary Conversion</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Convert your hourly wage to annual salary in the USA. This calculator accounts for standard working hours and overtime considerations.
            </p>
            <div className="bg-green-50 border border-green-200 p-4 rounded mt-4">
              <p className="text-green-800">
                <strong>💡 USA Fact:</strong> Standard working week is 40 hours, with overtime pay required for hours over 40.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'usa-overtime-pay') {
      calculatorId = 'usaOvertimePay';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">USA Overtime Pay Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate overtime pay in the USA. The Fair Labor Standards Act (FLSA) requires 1.5x regular pay for hours worked over 40 per week.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-4">
              <p className="text-blue-800">
                <strong>💡 FLSA Rule:</strong> Non-exempt employees must receive overtime pay for hours over 40 in a workweek.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'usa-bonus-tax') {
      calculatorId = 'usaBonusTax';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">USA Bonus Tax Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate tax on bonus payments in the USA. Bonuses are taxed at your marginal federal and state income tax rates.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mt-4">
              <p className="text-yellow-800">
                <strong>💡 Tax Planning:</strong> Bonuses may be subject to additional Medicare tax above certain income thresholds.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (slug === 'usa-contractor-salary-calculator') {
      calculatorId = 'usaContractorSalary';
      educationalContent = (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">USA Contractor Calculator</h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              Calculate contractor rates and take-home pay in the USA. Includes self-employment tax (15.3%) and business expense considerations.
            </p>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded mt-4">
              <p className="text-purple-800">
                <strong>💡 Contractor Tip:</strong> Consider forming an LLC to optimize tax efficiency and liability protection.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const { default: EnhancedCalculator } = await import('../../../components/EnhancedCalculator');
    return (
      <EnhancedCalculator
        pageData={pageData}
        calculatorId={calculatorId}
        educationalContent={educationalContent}
        taxBreakdownTable={taxBreakdownTable}
      />
    );
  }

  // For other calculator pages, load data and use the DynamicPageClient
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
