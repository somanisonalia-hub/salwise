import Link from 'next/link';
import Head from 'next/head';

export default function ITIndustryPage() {
  return (
    <>
      <Head>
        <title>IT Industry Salary Guide | Technology Career Salaries | SalaryWise.io</title>
        <meta name="description" content="Explore IT and technology industry salaries. Compare compensation for software developers, cybersecurity, data science, cloud engineering, and tech roles." />
        <meta name="keywords" content="IT salary guide, technology salaries, software developer pay, cybersecurity salary, data science compensation" />
        <link rel="canonical" href="https://salarywise.io/en/industry/it" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IT Industry Salary Guide</h1>
                <p className="text-gray-600 mt-1">Technology career salaries and compensation trends</p>
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
              The IT industry offers some of the highest salaries and best job opportunities in today's economy. From software development to cybersecurity, data science to cloud engineering, IT careers provide excellent compensation and growth potential.
            </p>
            <p className="text-gray-700">
              This guide explores salary ranges, career progression, and key factors influencing compensation in the technology sector.
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">IT Career Information</h2>
            <p className="mb-4">Learn about IT industry salaries and career opportunities.</p>
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

