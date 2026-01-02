'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VersionOption {
  id: string;
  name: string;
  description: string;
  file: string;
  color: string;
}

const versions: VersionOption[] = [
  {
    id: 'original',
    name: 'Original',
    description: 'Current production version',
    file: 'page.tsx',
    color: 'bg-gray-100 hover:bg-gray-200'
  },
  {
    id: 'seo',
    name: 'SEO Optimized',
    description: 'Structured data & search optimization',
    file: 'page-seo-optimized.tsx',
    color: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'conversion',
    name: 'Conversion Optimized',
    description: 'CTAs & social proof focus',
    file: 'page-conversion-optimized.tsx',
    color: 'bg-green-50 hover:bg-green-100'
  },
  {
    id: 'performance',
    name: 'Performance Optimized',
    description: 'Speed & loading optimization',
    file: 'page-performance-optimized.tsx',
    color: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'mobile',
    name: 'Mobile Optimized',
    description: 'Mobile-first user experience',
    file: 'page-mobile-optimized.tsx',
    color: 'bg-orange-50 hover:bg-orange-100'
  }
];

export default function VersionSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<VersionOption>(versions[0]);

  const handleVersionSelect = (version: VersionOption) => {
    setSelectedVersion(version);
    setIsOpen(false);

    // You can add logic here to actually switch the version
    console.log(`Switching to: ${version.name}`);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <span className="font-medium text-gray-700">{selectedVersion.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute z-20 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Home Page Versions</h3>
                <p className="text-sm text-gray-600">Switch between optimization versions</p>
              </div>

              {versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => handleVersionSelect(version)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedVersion.id === version.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                      selectedVersion.id === version.id ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{version.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{version.description}</div>
                      <div className="text-xs text-gray-500 mt-1 font-mono">{version.file}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // You can add logic here to apply the selected version
                  alert(`To switch to ${selectedVersion.name}, run: cp src/app/${selectedVersion.file} src/app/page.tsx`);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply {selectedVersion.name} Version
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

