import Link from 'next/link';
import Head from 'next/head';

export default function SalaryTrendsGuidePage() {
  return (
    <>
      <Head>
        <title>Salary Trends 2026 | Future Pay Predictions | SalaryWise.io</title>
        <meta name="description" content="Explore salary trends and predictions for 2026. Learn about emerging industries, remote work impact, AI influence, and economic factors affecting compensation." />
        <meta name="keywords" content="salary trends 2026, future salary predictions, compensation trends, pay forecasts, economic salary outlook" />
        <link rel="canonical" href="https://salarywise.io/en/guides/salary-trends-2026" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Salary Trends 2026</h1>
                <p className="text-gray-600 mt-1">Future predictions for compensation and pay</p>
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
              As we look toward 2026, several major economic, technological, and social factors are reshaping the compensation landscape. From artificial intelligence and remote work to inflation and labor shortages, understanding these trends is crucial for career planning and salary negotiations.
            </p>
            <p className="text-gray-700">
              This guide analyzes current data and expert predictions to forecast salary trends, identify high-growth industries, and provide insights for maximizing earning potential in the coming year.
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">2026 Salary Predictions</h2>
            <p className="mb-4">Explore future salary trends and compensation predictions.</p>
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
