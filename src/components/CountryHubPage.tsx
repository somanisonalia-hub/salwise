'use client';

import Link from 'next/link';
import Head from 'next/head';

interface CountryPageData {
  slug: string;
  type: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  related: string[];
  title: string;
  description: string;
  keywords: string;
  canonical: string;

  hero: {
    title: string;
    subtitle: string;
    cta: {
      text: string;
      href: string;
    };
  };

  intro: {
    paragraph1: string;
    paragraph2: string;
  };

  calculators: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      href: string;
    }>;
  };

  guides: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      href: string;
    }>;
  };

  countryNav: {
    title: string;
    links: Array<{
      name: string;
      flag: string;
      href: string;
      active?: boolean;
    }>;
  };

  ctaFooter: {
    title: string;
    text: string;
    link: {
      text: string;
      href: string;
    };
  };

  structuredData?: any;
}

interface CountryHubPageProps {
  pageData: CountryPageData;
}

export default function CountryHubPage({ pageData }: CountryHubPageProps) {
  const structuredData = pageData.structuredData || {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.h1,
    "description": pageData.metaDescription,
    "url": pageData.canonical
  };

  return (
    <>
      <Head>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageData.keywords} />
        <link rel="canonical" href={pageData.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{pageData.hero.title}</h1>
            <p className="text-xl mb-8 text-blue-100">{pageData.hero.subtitle}</p>
            <Link
              href={pageData.hero.cta.href}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {pageData.hero.cta.text}
            </Link>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed">{pageData.intro.paragraph1}</p>
              <p className="text-lg leading-relaxed mt-4">{pageData.intro.paragraph2}</p>
            </div>
          </div>
        </section>

        {/* Calculators Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.calculators.title}</h2>
              <p className="text-xl text-gray-600">{pageData.calculators.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.calculators.items.map((calculator, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{calculator.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{calculator.description}</p>
                  <Link
                    href={calculator.href}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Use Calculator →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.guides.title}</h2>
              <p className="text-xl text-gray-600">{pageData.guides.subtitle}</p>
            </div>

            <ul className="space-y-4">
              {pageData.guides.items.map((guide, index) => (
                <li key={index} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                  <Link
                    href={guide.href}
                    className="text-lg text-blue-600 hover:text-blue-800 font-medium flex-1"
                  >
                    {guide.title}
                  </Link>
                  <span className="text-gray-400 ml-4">→</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Country Navigation */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{pageData.countryNav.title}</h2>
            <div className="flex justify-center space-x-8">
              {pageData.countryNav.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                    link.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-3xl mb-2">{link.flag}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{pageData.ctaFooter.title}</h2>
            <p className="text-xl mb-8 text-blue-100">{pageData.ctaFooter.text}</p>
            <Link
              href={pageData.ctaFooter.link.href}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {pageData.ctaFooter.link.text}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}


