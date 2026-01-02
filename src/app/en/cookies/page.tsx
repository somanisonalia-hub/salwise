'use client';

import Link from 'next/link';
import Head from 'next/head';
import content from '../../../locales/en/cookies.json';

export default function CookiesPage() {
  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={content.canonical} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/en" className="text-2xl font-bold text-blue-600">
                  SalaryWise.io
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/en/salary-calculator" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Calculators
                </Link>
                <Link href="/en/country" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  By Country
                </Link>
                <Link href="/en/industry" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  By Industry
                </Link>
                <Link href="/en/guides" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Guides
                </Link>
              </nav>
            </div>
          </div>
        </div>

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

        {/* Intro Section */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 mb-4">{content.intro.paragraph1}</p>
            <p className="text-gray-700">{content.intro.paragraph2}</p>
          </div>
        </div>

        {/* What Are Cookies */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.whatAreCookies.title}</h2>
            <p className="text-gray-700 leading-relaxed">{content.whatAreCookies.content}</p>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.cookieTypes.map((cookieType, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{cookieType.type}</h3>
                    {cookieType.required && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{cookieType.description}</p>
                  <p className="text-sm text-gray-700 mb-3"><strong>Purpose:</strong> {cookieType.purpose}</p>
                  <p className="text-sm text-gray-700 mb-3"><strong>Duration:</strong> {cookieType.duration}</p>
                  <div className="text-sm">
                    <strong>Examples:</strong>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {cookieType.examples.map((example, exIndex) => (
                        <li key={exIndex}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{content.thirdPartyCookies.title}</h2>
            <p className="text-center text-gray-700 mb-8">{content.thirdPartyCookies.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.thirdPartyCookies.services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-3">{service.purpose}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>Privacy Policy:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">{service.policy}</a></p>
                    <p><strong>Opt-out:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">{service.optOut}</a></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cookie Management */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.cookieManagement.title}</h2>
            <div className="space-y-6">
              {content.cookieManagement.methods.map((method, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.method}</h3>
                  <p className="text-gray-700 mb-3">{method.description}</p>
                  {method.steps && (
                    <div className="text-sm">
                      <strong>Steps:</strong>
                      <ol className="mt-1 list-decimal list-inside text-gray-600 space-y-1">
                        {method.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {method.availability && (
                    <p className="text-sm text-gray-600 mt-2"><strong>Availability:</strong> {method.availability}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-yellow-700 text-sm">{content.cookieManagement.note}</p>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.dataRetention.title}</h2>
            <p className="text-gray-700 leading-relaxed">{content.dataRetention.content}</p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.updates.title}</h2>
            <p className="text-gray-700 leading-relaxed">{content.updates.content}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{content.contact.title}</h2>
            <p className="text-lg mb-4 text-blue-100">{content.contact.content}</p>
            <div className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium inline-block mb-6">
              {content.contact.email}
            </div>
            <div>
              <Link
                href={`/en${content.contact.link}`}
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Calculators</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/salary-calculator" className="text-gray-600 hover:text-blue-600">Salary Calculator</Link></li>
                  <li><Link href="/en/hourly-to-salary-calculator" className="text-gray-600 hover:text-blue-600">Hourly to Salary</Link></li>
                  <li><Link href="/en/gross-to-net-salary" className="text-gray-600 hover:text-blue-600">Gross to Net</Link></li>
                  <li><Link href="/en/take-home-pay-calculator" className="text-gray-600 hover:text-blue-600">Take Home Pay</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
                  <li><Link href="/en/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                  <li><Link href="/en/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
                  <li><Link href="/en/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/cookies" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
                  <li><Link href="/en/disclaimer" className="text-gray-600 hover:text-blue-600">Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/en/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
                  <li><Link href="/en/salary-guide" className="text-gray-600 hover:text-blue-600">Salary Guide</Link></li>
                  <li><Link href="/en/how-salary-calculators-work" className="text-gray-600 hover:text-blue-600">Calculator Guide</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">© 2026 SalaryWise.io. Free salary calculators for everyone.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
