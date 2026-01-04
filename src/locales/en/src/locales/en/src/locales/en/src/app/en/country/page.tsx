import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary Calculators by Country | International Pay Tools',
  description: 'Calculate your take-home pay in 15+ countries. Compare salaries, taxes, and benefits across the US, UK, Canada, Australia, Europe, and Asia.',
};

export default function CountryPage() {
  const countries = [
    {
      name: 'United States',
      slug: 'usa-salary-calculator',
      flag: '🇺🇸',
      currency: 'USD',
      description: 'Federal & state income tax, FICA taxes, comprehensive benefits'
    },
    {
      name: 'United Kingdom',
      slug: 'uk-salary-calculator', 
      flag: '🇬🇧',
      currency: 'GBP',
      description: 'Income tax, National Insurance, student loan repayments'
    },
    {
      name: 'Ireland',
      slug: 'ireland-salary-calculator',
      flag: '🇮🇪', 
      currency: 'EUR',
      description: 'PAYE income tax, PRSI, Universal Social Charge'
    },
    {
      name: 'Canada',
      slug: 'canada-salary-calculator',
      flag: '🇨🇦',
      currency: 'CAD', 
      description: 'Federal & provincial income tax, CPP, EI contributions'
    },
    {
      name: 'Australia',
      slug: 'australia-salary-calculator',
      flag: '🇦🇺',
      currency: 'AUD',
      description: 'Income tax, Medicare levy, superannuation contributions'
    },
    {
      name: 'Germany',
      slug: 'germany-salary-calculator',
      flag: '🇩🇪',
      currency: 'EUR',
      description: 'Income tax, social security, healthcare contributions'
    },
    {
      name: 'France',
      slug: 'france-salary-calculator', 
      flag: '🇫🇷',
      currency: 'EUR',
      description: 'Income tax, social charges, employee contributions'
    },
    {
      name: 'Spain',
      slug: 'spain-salary-calculator',
      flag: '🇪🇸',
      currency: 'EUR',
      description: 'Income tax, social security contributions'
    },
    {
      name: 'India',
      slug: 'india-salary-calculator',
      flag: '🇮🇳',
      currency: 'INR',
      description: 'Income tax, professional tax, provident fund'
    },
    {
      name: 'Singapore',
      slug: 'singapore-salary-calculator',
      flag: '🇸🇬', 
      currency: 'SGD',
      description: 'Income tax, CPF contributions'
    },
    {
      name: 'Netherlands',
      slug: 'netherlands-salary-calculator',
      flag: '🇳🇱',
      currency: 'EUR',
      description: 'Income tax, social security contributions'
    },
    {
      name: 'Sweden',
      slug: 'sweden-salary-calculator',
      flag: '🇸🇪',
      currency: 'SEK',
      description: 'Income tax, social security contributions'
    },
    {
      name: 'Switzerland',
      slug: 'switzerland-salary-calculator',
      flag: '🇨🇭',
      currency: 'CHF',
      description: 'Income tax, social security contributions'
    },
    {
      name: 'New Zealand',
      slug: 'new-zealand-salary-calculator',
      flag: '🇳🇿',
      currency: 'NZD',
      description: 'Income tax, ACC levies, KiwiSaver'
    },
    {
      name: 'South Africa',
      slug: 'south-africa-salary-calculator',
      flag: '🇿🇦',
      currency: 'ZAR',
      description: 'Income tax, UIF, SDL contributions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Salary Calculators by Country
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare take-home pay across 15+ countries worldwide. Each calculator is customized 
            for local tax laws, currency, and benefit structures, ensuring accurate calculations 
            for informed decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <a
              key={country.slug}
              href={`/en/${country.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{country.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
                  <p className="text-sm text-gray-500">{country.currency}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{country.description}</p>
              <div className="mt-4 text-blue-600 text-sm font-medium">
                Calculate Salary →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare Salaries Globally
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Understanding how your salary translates across different countries is essential 
            for international job opportunities, expatriate assignments, and global career planning.
          </p>
          <a
            href="/en/salary-calculator"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Global Salary Comparison Tool
          </a>
        </div>
      </div>
    </div>
  );
}
