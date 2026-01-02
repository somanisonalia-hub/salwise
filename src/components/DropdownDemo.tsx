'use client';

import VersionSwitcher from './VersionSwitcher';
import CalculatorDropdown from './CalculatorDropdown';
import CountryDropdown from './CountryDropdown';

export default function DropdownDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dropdown Components Demo</h1>
        <p className="text-lg text-gray-600">
          Interactive dropdown components for SalaryWise.io
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Version Switcher */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Version Switcher</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Switch between home page optimization versions
          </p>
          <div className="flex justify-center">
            <VersionSwitcher />
          </div>
        </div>

        {/* Calculator Dropdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Calculator Selector</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Browse all available calculators by category
          </p>
          <div className="flex justify-center">
            <CalculatorDropdown />
          </div>
        </div>

        {/* Country Dropdown */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Country Selector</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Choose country-specific tax calculators
          </p>
          <div className="flex justify-center">
            <CountryDropdown />
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-12 bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use These Dropdowns</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Integration Example:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`import VersionSwitcher from './components/VersionSwitcher';
import CalculatorDropdown from './components/CalculatorDropdown';
import CountryDropdown from './components/CountryDropdown';

export default function Header() {
  return (
    <header className="flex gap-4">
      <CalculatorDropdown />
      <CountryDropdown />
      <VersionSwitcher />
    </header>
  );
}`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Keyboard accessible</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Mobile responsive</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Click outside to close</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Smooth animations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Customizable styling</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

