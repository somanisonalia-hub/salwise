'use client';

import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/privacy-policy.json';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={content.canonical} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {content.h1}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                Last updated: {content.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.keyPoints.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{point.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  This privacy policy was last updated on {content.lastUpdated}.
                  If you have any questions, please <Link href="/en/contact" className="text-blue-600 hover:text-blue-800 underline">contact us</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
