import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
    guide: string;
  }>;
}

// Supported locales
const supportedLocales = ['en', 'es', 'fr'];

export async function generateStaticParams() {
  const guides = [
    'how-to-calculate-take-home',
    'gross-vs-net-salary',
    'salary-negotiation-tips',
    'taxes-explained-by-country',
    'salary-trends-2026',
    'salary-vs-freelance-income',
    'cost-of-living-vs-salary',
    'how-bonuses-are-taxed',
    'salary-calculation-examples',
    'common-salary-mistakes'
  ];

  const params: Array<{ locale: string; guide: string }> = [];

  for (const locale of supportedLocales) {
    for (const guide of guides) {
      params.push({ locale, guide });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, guide } = await params;

  if (!supportedLocales.includes(locale)) {
    return {};
  }

  try {
    let content;
    if (locale === 'en') {
      content = require(`../../../../locales/en/guides/${guide}.json`);
    } else {
      try {
        content = require(`../../../../locales/${locale}/guides/${guide}.json`);
      } catch {
        content = require(`../../../../locales/en/guides/${guide}.json`);
      }
    }

    content = content.default || content;

    return {
      title: content.title || content.metaTitle,
      description: content.description || content.metaDescription,
      keywords: content.keywords || [content.primaryKeyword, ...content.longTailKeywords].join(', '),
    };
  } catch (error) {
    return {
      title: 'Guide Not Found',
      description: 'The guide you are looking for could not be found.',
    };
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, guide } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  let content;
  try {
    if (locale === 'en') {
      content = require(`../../../../locales/en/guides/${guide}.json`);
    } else {
      try {
        content = require(`../../../../locales/${locale}/guides/${guide}.json`);
      } catch {
        content = require(`../../../../locales/en/guides/${guide}.json`);
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

  content = content.default || content;

  return (
    <>
      <Head>
        <title>{content.title || content.metaTitle}</title>
        <meta name="description" content={content.description || content.metaDescription} />
        <meta name="keywords" content={content.keywords || [content.primaryKeyword, ...content.longTailKeywords].join(', ')} />
        <link rel="canonical" href={`https://salarywise.io/${locale}/guides/${guide}`} />
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
