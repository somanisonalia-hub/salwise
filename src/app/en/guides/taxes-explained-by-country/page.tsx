import Link from 'next/link';
import Head from 'next/head';

export default function TaxesGuidePage() {
  return (
    <>
      <Head>
        <title>Taxes Explained by Country | International Tax Guide | SalaryWise.io</title>
        <meta name="description" content="Comprehensive guide to tax systems around the world. Learn how income tax, social contributions, and deductions work in different countries." />
        <meta name="keywords" content="international tax guide, taxes by country, income tax comparison, tax systems worldwide, global tax guide" />
        <link rel="canonical" href="https://salarywise.io/en/guides/taxes-explained-by-country" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Taxes Explained by Country</h1>
                <p className="text-gray-600 mt-1">Understanding international tax systems</p>
              </div>
              <Link
                href="/en"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Tax systems vary significantly around the world, reflecting different cultural, economic, and political priorities. Understanding how taxes work in different countries is essential for expatriates, international workers, and anyone interested in global financial planning.
            </p>
            <p className="text-gray-700">
              This guide explores major tax systems, comparing income tax rates, social contributions, deductions, and unique features of tax systems in different countries.
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">International Tax Guide</h2>
            <p className="mb-4">Learn about tax systems in different countries around the world.</p>
            <Link
              href="/en"
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

