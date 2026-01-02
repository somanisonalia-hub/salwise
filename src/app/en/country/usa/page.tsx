import Link from 'next/link';
import Head from 'next/head';

export default function USACountryPage() {
  return (
    <>
      <Head>
        <title>USA Salary Calculator | Take-Home Pay Calculator | SalaryWise.io</title>
        <meta name="description" content="Calculate take-home pay in the USA including federal income tax, state taxes, Social Security, and Medicare. Accurate US tax calculations with state-specific rates." />
        <meta name="keywords" content="USA salary calculator, US tax calculator, take home pay USA, US paycheck calculator, federal tax calculator" />
        <link rel="canonical" href="https://salarywise.io/en/country/usa" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">USA Salary Calculator</h1>
                <p className="text-gray-600 mt-1">Calculate your take-home pay with accurate US tax calculations</p>
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
              Understanding your take-home pay in the United States requires accounting for federal income tax, state taxes, Social Security, and Medicare. Our USA-specific calculator provides accurate take-home pay calculations for American workers.
            </p>
            <p className="text-gray-700">
              Enter your gross salary, tax code, and state to get comprehensive breakdown of your net pay and tax obligations.
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">USA Tax Calculator</h2>
            <p className="mb-4">Calculate your take-home pay with US federal and state taxes.</p>
            <Link
              href="/en"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Use Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

