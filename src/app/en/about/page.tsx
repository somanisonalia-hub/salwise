'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import content from '../../../locales/en/about.json';

export default function AboutPage() {
  useEffect(() => {
    document.title = content.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', content.metaDescription);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = content.metaDescription;
      document.head.appendChild(newMeta);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', content.canonical);
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = content.canonical;
      document.head.appendChild(newCanonical);
    }
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {content.h1}
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                {content.intro.paragraph1}
              </p>
              <p className="text-base sm:text-lg mb-8 text-blue-100 max-w-3xl mx-auto">
                {content.intro.paragraph2}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose SalaryWise.io?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Calculate Your Salary?</h2>
            <p className="text-lg mb-6 text-blue-100">{content.cta.description}</p>
            <Link
              href={`/en${content.cta.href}`}
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {content.cta.text}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
