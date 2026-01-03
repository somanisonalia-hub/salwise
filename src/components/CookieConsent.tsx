'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.log('CookieConsent component mounted'); // Debug log

    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    console.log('Cookie consent status:', consent); // Debug log

    // FORCE SHOW FOR TESTING - Remove this line after testing
    console.log('FORCED: Showing banner immediately for testing');
    setShowPopup(true);
    return;

    if (!consent) {
      console.log('No consent found, showing banner in 2 seconds'); // Debug log
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        console.log('Showing cookie banner now'); // Debug log
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log('Consent already given, not showing banner'); // Debug log
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowPopup(false);

    // Enable Google Analytics if it exists
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookieConsent', 'necessary-only');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowPopup(false);

    // Disable non-essential cookies
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  const customizeCookies = () => {
    setShowDetails(!showDetails);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-xl mr-3">🍪</div>
                <div>
                  <h3 className="text-sm font-bold">We use cookies to improve your experience</h3>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-blue-200 hover:text-white transition-colors ml-4"
                aria-label="Close cookie preferences"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Compact Content */}
          <div className="px-6 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Description */}
              <div className="flex-1">
                <p className="text-gray-700 text-sm mb-2">
                  We use cookies for essential functionality, analytics, and personalized content.
                  You can manage your preferences anytime.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                  <Link href="/en/privacy-policy" className="hover:text-blue-600 underline">
                    Privacy Policy
                  </Link>
                  <Link href="/en/cookies" className="hover:text-blue-600 underline">
                    Cookie Policy
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <button
                  onClick={acceptAllCookies}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={customizeCookies}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors underline"
                >
                  Customize
                </button>
              </div>
            </div>

            {/* Expandable Details */}
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Cookie Categories</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-1 text-sm">Necessary</h5>
                    <p className="text-green-800 text-xs">Required for website functionality</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-1 text-sm">Analytics</h5>
                    <p className="text-blue-800 text-xs">Help us improve your experience</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-1 text-sm">Marketing</h5>
                    <p className="text-purple-800 text-xs">Personalized content and ads</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={acceptAllCookies}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
                  >
                    Save All Preferences
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded font-semibold text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
