'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { calculateResults, getCalculator } from '../lib/calculatorEngine';
import {
  getCalculatorInputs,
  getInputDefinition,
  isInputVisible,
  validateCalculatorInputs,
  getCalculatorDefaults,
  mapInputsForCalculator,
  mapCalculatorIdToSlug,
  CalculatorInput
} from '../lib/calculatorInputConfig';

interface CalculatorData {
  inputs: Array<{
    id: string;
    label: string;
    type: string;
    default: any;
    options?: Array<{value: string, label: string}>;
    required?: boolean;
    description?: string;
    unit?: string;
    min?: number;
    max?: number;
  }>;
  outputs: Array<{
    id: string;
    label: string;
    type: string;
    description?: string;
    unit?: string;
  }>;
  examples?: Array<{ // Made optional
    title: string;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
  }>;
  formula: Record<string, string>; // Added formula
}

interface PageData {
  slug: string; // Added slug to PageData interface
  h1: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  calculator?: CalculatorData;
  country?: string;
  currency?: string;
  flag?: string;
  related?: string[];
  useCases?: Array<{
    title: string;
    scenario: string;
    inputs: Record<string, any>;
    outputs: Record<string, any>;
  }>;
  taxBreakdown?: Array<{
    name: string;
    description: string;
    rate: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

interface EnhancedCalculatorProps {
  pageData: PageData;
  calculatorId?: string;
  educationalContent?: React.ReactNode;
  taxBreakdownTable?: React.ReactNode;
}

export default function EnhancedCalculator({
  pageData,
  calculatorId,
  educationalContent,
  taxBreakdownTable
}: EnhancedCalculatorProps) {
  // Get standardized input configuration
  // Use calculatorId to determine the correct slug for input config
  const inputConfigSlug = calculatorId ? mapCalculatorIdToSlug(calculatorId) : (pageData.slug || '');
  let inputDefinitions: CalculatorInput[] = [];

  // First try to get inputs from master table
  const masterTableInputs = getCalculatorInputs(inputConfigSlug);
  if (masterTableInputs.length > 0) {
    // Use master table inputs
    inputDefinitions = masterTableInputs;
  } else if (calculatorId) {
    // Fall back to calculator data file inputs
    const calculatorData = getCalculator(calculatorId) as CalculatorData;
    if (calculatorData && calculatorData.inputs) {
      inputDefinitions = calculatorData.inputs as CalculatorInput[];
    }
  }

  // Get defaults based on available input definitions
  const getInitialDefaults = () => {
    let defaults = getCalculatorDefaults(inputConfigSlug);

    // If no master table defaults found, try to get defaults from input definitions
    if (Object.keys(defaults).length === 0 && inputDefinitions.length > 0) {
      defaults = {};
      inputDefinitions.forEach(input => {
        if (input.default !== undefined) {
          defaults[input.id] = input.default;
        }
      });
    }

    return defaults;
  };

  const [inputs, setInputs] = useState<Record<string, any>>(getInitialDefaults);

  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (id: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCalculate = async () => {
    if (calculatorId) {
      setIsCalculating(true);
      try {
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        const mappedInputs = mapInputsForCalculator(inputConfigSlug, inputs);
        const calculatedResults = calculateResults(calculatorId, mappedInputs);
        setResults(calculatedResults);
      } catch (error) {
        console.error('Error calculating results:', error);
        setResults(null);
      } finally {
        setIsCalculating(false);
      }
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageData.h1,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "applicationCategory": "Calculator",
    "description": pageData.description,
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Head>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageData.longTailKeywords.join(', ')} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageData.h1}</h1>
              <p className="text-gray-600 mt-1">{pageData.description}</p>
            </div>
            <Link
              href="/en/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Calculator Section - LEFT */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">

            <div className="space-y-3">
              {inputDefinitions.map((input) => {
                if (!isInputVisible(input, inputs)) {
                  return null;
                }
                return (
                  <div key={input.id}>
                    {input.type !== 'checkbox' && (
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {input.label}
                        {input.unit && <span className="text-gray-500 ml-1">({input.unit})</span>}
                      </label>
                    )}

                    {input.type === 'select' ? (
                      <select
                        value={inputs[input.id] || ''}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        {input.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : input.type === 'number' ? (
                      <input
                        type="number"
                        value={inputs[input.id] || ''}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        placeholder={input.default?.toString()}
                        min={input.min}
                        max={input.max}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : input.type === 'checkbox' ? (
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(inputs[input.id] ?? false)}
                          onChange={(e) => handleInputChange(input.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{input.label}</span>
                      </label>
                    ) : (
                      <input
                        type={input.type}
                        value={inputs[input.id] || ''}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        placeholder={input.default?.toString()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    )}

                    {input.description && (
                      <p className="text-xs text-gray-500 mt-1">{input.description}</p>
                    )}
                  </div>
                );
              })}

              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm ${
                  isCalculating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  `Calculate ${pageData.primaryKeyword}`
                )}
              </button>
            </div>
          </div>

          {/* Results Section - RIGHT */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm">📊</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Calculation Results</h2>
              </div>

            {isCalculating ? (
              <div className="text-center py-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Processing...</h3>
                <p className="text-gray-600 text-xs">Calculating results...</p>
              </div>
            ) : results ? (
              <div className="space-y-2">
                {Object.entries(results).map(([key, value]) => {
                  // Format the output based on the key
                  let displayValue = value;
                  let unit = '';
                  let icon = '';
                  let bgColor = 'bg-gray-50';
                  let textColor = 'text-gray-900';
                  let isPrimary = false;

                  // Determine currency based on page slug - ensure single character symbols only
                  const isUK = pageData.slug && pageData.slug.includes('uk');
                  const isUS = pageData.slug && (pageData.slug.includes('us') || pageData.slug.includes('usa'));
                  const isIreland = pageData.slug && pageData.slug.includes('ireland');

                  let currencySymbol = '€'; // Default
                  if (isUK) currencySymbol = '£';
                  else if (isUS) currencySymbol = '$';
                  else if (isIreland) currencySymbol = '€';
                  else if (pageData.currency) {
                    // Ensure it's a single character or map common codes to symbols
                    const currencyValue = pageData.currency.toString().trim();
                    if (currencyValue === 'GBP' || currencyValue === '£') currencySymbol = '£';
                    else if (currencyValue === 'USD' || currencyValue === '$') currencySymbol = '$';
                    else if (currencyValue === 'EUR' || currencyValue === '€') currencySymbol = '€';
                    else if (currencyValue.length === 1) currencySymbol = currencyValue; // Single character
                  }

                  if (typeof value === 'number') {
                    // Check for percentage results first (most specific)
                    if (key.includes('rate') || key.includes('percent') || key.includes('Rate')) {
                      displayValue = value.toFixed(2) + '%';
                      unit = '';
                      icon = '📈';
                      bgColor = 'bg-blue-50';
                      textColor = 'text-blue-900';
                    }
                    // Primary net annual salary (most important result)
                    else if (key.toLowerCase().includes('net') && key.toLowerCase().includes('annual')) {
                      isPrimary = true;
                      unit = currencySymbol;
                      displayValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      icon = '💰';
                      bgColor = 'bg-gradient-to-r from-green-50 to-emerald-50';
                      textColor = 'text-green-900';
                    }
                    // Tax-related results
                    else if (key.toLowerCase().includes('tax') || key.toLowerCase().includes('nic') || key.toLowerCase().includes('social') || key.toLowerCase().includes('prsi') || key.toLowerCase().includes('usc')) {
                      unit = currencySymbol;
                      displayValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      icon = '💸';
                      bgColor = 'bg-red-50';
                      textColor = 'text-red-900';
                    }
                    // Salary and income results
                    else if (key.toLowerCase().includes('annual') || key.toLowerCase().includes('salary') || key.toLowerCase().includes('gross') || key.toLowerCase().includes('bonus') || key.toLowerCase().includes('pension') || key.toLowerCase().includes('income') || key.toLowerCase().includes('pay') || key.toLowerCase().includes('wage')) {
                      unit = currencySymbol;
                      displayValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      icon = '💼';
                      bgColor = 'bg-emerald-50';
                      textColor = 'text-emerald-900';
                    }
                    // Overtime results
                    else if (key.toLowerCase().includes('overtime')) {
                      unit = currencySymbol;
                      displayValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      icon = '⏰';
                      bgColor = 'bg-orange-50';
                      textColor = 'text-orange-900';
                    }
                    // 401(k) and other contribution results
                    else if (key.toLowerCase().includes('contribution') || key.toLowerCase().includes('four') || key.toLowerCase().includes('deduction')) {
                      unit = currencySymbol;
                      displayValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      icon = '💼';
                      bgColor = 'bg-emerald-50';
                      textColor = 'text-emerald-900';
                    }
                    else {
                      // For other numeric values, show 2 decimal places if it's not a whole number
                      displayValue = value % 1 === 0 ? value.toLocaleString() : value.toFixed(2);
                      icon = '📊';
                      bgColor = 'bg-purple-50';
                      textColor = 'text-purple-900';
                    }
                  }

                  return (
                    <div
                      key={key}
                      className={`${bgColor} border rounded-md p-3 transition-all duration-200 hover:shadow-sm ${isPrimary ? 'ring-1 ring-green-200 shadow-md' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="text-sm flex-shrink-0">{icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-700 capitalize leading-tight truncate">
                              {key === 'fourOOneKContribution'
                                ? '401(k) Contribution'
                                : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                              }
                            </div>
                          </div>
                        </div>
                        <div className={`text-right flex-shrink-0 ${textColor}`}>
                          <div className={`font-bold ${isPrimary ? 'text-lg' : 'text-base'} leading-tight`}>
                            {unit}{displayValue}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Ready to Calculate</h3>
                <p className="text-gray-600 text-xs">Enter your details to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Tax Breakdown Table */}
        {taxBreakdownTable && (
          <div className="mt-6">
            {taxBreakdownTable}
          </div>
        )}

        {/* Educational Content */}
        {educationalContent && (
          <div className="mt-6">
            {educationalContent}
          </div>
        )}

        {/* Use Cases */}
        {pageData.useCases && pageData.useCases.length > 0 && (
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Use Cases</h3>
            <div className="space-y-4">
              {pageData.useCases.map((useCase, index) => (
                <div key={index} className="border border-gray-200 rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                  <p className="text-gray-600 mb-3">{useCase.scenario}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm font-medium text-blue-900 mb-2">Inputs</div>
                      <div className="space-y-1 text-sm text-blue-800">
                        {Object.entries(useCase.inputs).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-sm font-medium text-green-900 mb-2">Results</div>
                      <div className="space-y-1 text-sm text-green-800">
                        {Object.entries(useCase.outputs).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {pageData.faqs && pageData.faqs.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              Global Salary Calculator FAQs
            </h3>

            <div className="space-y-6">
              {pageData.faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
