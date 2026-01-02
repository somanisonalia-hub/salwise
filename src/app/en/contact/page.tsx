'use client';

import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/contact.json';

export default function ContactPage() {
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
              <p className="text-lg sm:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
                {content.intro.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
                {content.intro.paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.contactMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{method.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded font-medium mb-2">
                      {method.contact}
                    </div>
                    <p className="text-sm text-gray-500">{method.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {content.faqPreview.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q: {faq.question}</h3>
                  <p className="text-gray-700">A: {faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/en/faq"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mx-4 sm:mx-6 lg:mx-8 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {content.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.social.title}</h2>
            <p className="text-gray-600 mb-8">{content.social.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
              {content.social.platforms.map((platform, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-blue-600 font-medium">{platform.handle}</p>
                  <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
