import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/industry/index.json';

export default function IndustriesPage() {
  const structuredData = content.structuredData;

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={content.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{content.header.title}</h1>
                <p className="text-gray-600 mt-1">{content.header.subtitle}</p>
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

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-4">{content.intro.paragraph1}</p>
            <p className="text-gray-700">{content.intro.paragraph2}</p>
          </div>

          {/* Industries Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Industry Salary Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.industries.map((industry: any, index: number) => (
                <Link
                  key={index}
                  href={industry.href}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-600 text-xl">
                        {industry.slug === 'it' && '💻'}
                        {industry.slug === 'healthcare' && '🏥'}
                        {industry.slug === 'finance' && '💰'}
                        {industry.slug === 'engineering' && '⚙️'}
                        {industry.slug === 'teacher' && '👨‍🏫'}
                        {industry.slug === 'retail' && '🛍️'}
                        {industry.slug === 'construction' && '🏗️'}
                        {industry.slug === 'legal' && '⚖️'}
                        {industry.slug === 'marketing-sales' && '📈'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
                      <div className="space-y-1 text-sm">
                        <div><strong>Average Salary:</strong> {industry.averageSalary}</div>
                        <div><strong>Growth:</strong> {industry.growth}</div>
                      </div>
                      <div className="mt-3 text-blue-600 font-medium">Learn More →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Salary Factors */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{content.salaryFactors.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.salaryFactors.factors.map((factor: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{factor.title}</h3>
                  <p className="text-gray-600 text-sm">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{content.tools.title}</h2>
            <p className="text-gray-700 mb-6">{content.tools.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.tools.items.map((tool: any, index: number) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {tool.icon === 'calculator' && '🧮'}
                      {tool.icon === 'convert' && '🔄'}
                      {tool.icon === 'tax' && '📊'}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">{content.cta.title}</h2>
            <p className="mb-4">{content.cta.description}</p>
            <Link
              href={content.cta.button.href}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              {content.cta.button.text}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

