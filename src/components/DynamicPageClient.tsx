'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  loadPageData,
  loadCalculatorData
} from '../lib/pageLoader';
import { calculateResults, getCalculator } from '../lib/calculatorEngine';

interface PageData {
  slug: string;
  type: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  dataRef?: string;
  related?: string[];
  tips?: string[];
  faqs?: any[];
  disclaimer?: string | { title: string; content: string };
  universalDisclaimer?: { icon: string; title: string; content: string };
  socialSharing?: { title: string; links: any[] };
  intro?: string | { paragraph1: string; paragraph2: string };
  differentiationNotice?: { title: string; message: string; links?: any[] };
  howItWorks?: string;
  whatIsGrossVsNet?: string;
  howGrossConvertsToNet?: string;
  whatIsTakeHomePay?: string;
  howCalculatorWorks?: string;
  whyTakeHomeMatters?: string[];
  whatDoesNetToGrossMean?: string;
  howNetConvertsToGross?: string;
  whenToUseNetToGross?: string[];
  howHourlyConvertsToSalary?: string;
  factorsAffectingSalary?: string[];
  whenToUseHourlyToSalary?: string[];
  howBonusesAreCalculated?: string;
  whyUseBonusCalculator?: string[];
  howOvertimePayIsCalculated?: string;
  whenToUseOvertimeCalculator?: string[];
  useCases?: any;
  howSalaryAfterTaxWorksUSA?: string;
  howSalaryAfterTaxWorksUK?: string;
  howSalaryAfterTaxWorksIreland?: string;
  howSalaryAfterTaxWorksCanada?: string;
  howSalaryAfterTaxWorksAustralia?: string;
  howSalaryAfterTaxWorksGermany?: string;
  howSalaryAfterTaxWorksFrance?: string;
  howSalaryAfterTaxWorksSpain?: string;
  howSalaryAfterTaxWorksIndia?: string;
  howSalaryAfterTaxWorksSingapore?: string;
  howSalaryAfterTaxWorksNetherlands?: string;
  howSalaryAfterTaxWorksSweden?: string;
  howSalaryAfterTaxWorksSwitzerland?: string;
  howSalaryAfterTaxWorksNewZealand?: string;
  howSalaryAfterTaxWorksSouthAfrica?: string;
  howITTechSalariesAreCalculated?: string;
  howHealthcareSalariesAreCalculated?: string;
  howEngineeringSalariesAreCalculated?: string;
  howTeacherSalariesAreCalculated?: string;
  howFinanceBankingSalariesAreCalculated?: string;
  howRetailSalariesAreCalculated?: string;
  howConstructionSalariesAreCalculated?: string;
  howLegalSalariesAreCalculated?: string;
  howMarketingSalesSalariesAreCalculated?: string;
  howStartupEntrepreneurSalariesAreCalculated?: string;
  howEmiIsCalculated?: string;
  howSalaryVsExpensesIsCalculated?: string;
  howTakeHomeVsCostOfLivingIsCalculated?: string;
  howOvertimeBonusAndTaxAreCalculated?: string;
  howSalaryRaiseAndPromotionAreCalculated?: string;
  howSalaryVsFreelanceIncomeIsCalculated?: string;
  howSavingsFromSalaryIsCalculated?: string;
  howRetirementContributionsAreCalculated?: string;
  step1IdentifyGrossSalary?: string;
  step2CalculateTaxes?: string;
  step3DeductOtherExpenses?: string;
  step4CalculateNetSalary?: string;
  whatIsGrossSalary?: string;
  whatIsNetSalary?: string;
  keyDeductionsFromSalary?: string[];
  prepareBeforeNegotiation?: string[];
  duringTheNegotiation?: string[];
  afterNegotiation?: string[];
  commonMistakesToAvoid?: string[];
  commonTypesOfSalaryTaxes?: string[];
  taxComparisonByCountry?: any[];
  howToCalculateTaxes?: string;
  globalSalaryTrends?: string[];
  industrySpecificTrends?: any;
  salaryForecastsInsights?: string[];
  whyUseSalaryAfterTaxCalculator?: string[];
  whyUseSalaryCalculatorCanada?: string[];
  whyUseSalaryCalculatorAustralia?: string[];
  whyUseSalaryCalculatorGermany?: string[];
  whyUseSalaryCalculatorFrance?: string[];
  whyUseSalaryCalculatorSpain?: string[];
  whyUseSalaryCalculatorIndia?: string[];
  whyUseSalaryCalculatorSingapore?: string[];
  whyUseSalaryCalculatorNetherlands?: string[];
  whyUseSalaryCalculatorSweden?: string[];
  whyUseSalaryCalculatorSwitzerland?: string[];
  whyUseSalaryCalculatorNewZealand?: string[];
  whyUseSalaryCalculatorSouthAfrica?: string[];
  whyUseAnITTechSalaryCalculator?: string[];
  whyUseAHealthcareSalaryCalculator?: string[];
  whyUseAnEngineeringSalaryCalculator?: string[];
  whyUseATeacherSalaryCalculator?: string[];
  whyUseAFinanceBankingSalaryCalculator?: string[];
  whyUseARetailSalaryCalculator?: string[];
  whyUseAConstructionSalaryCalculator?: string[];
  whyUseALegalLawyerSalaryCalculator?: string[];
  whyUseAMarketingSalesSalaryCalculator?: string[];
  whyUseAStartupEntrepreneurSalaryCalculator?: string[];
  whyUseALoanEmiCalculator?: string[];
  whyUseASalaryVsExpensesCalculator?: string[];
  whyUseThisCalculator?: string[];
  example?: {
    scenario: string;
    results: string;
  };
  whenToUse?: string[];
  longTailKeywords?: string[];
  ui?: {
    calculatorHeading?: string;
    resultsHeading?: string;
    calculateButton?: string;
    scenarioLabel?: string;
    resultsLabel?: string;
    noResultsText?: string;
  };
}

interface DynamicPageClientProps {
  pageData: PageData;
  calculatorData?: any;
}

export default function DynamicPageClient({ pageData, calculatorData: initialCalculatorData }: DynamicPageClientProps) {
  // Load calculator data
  const loadedCalculatorData = pageData.type === 'calculator' && pageData.dataRef ?
    getCalculator(pageData.dataRef) : initialCalculatorData;

  const calculatorData = loadedCalculatorData || initialCalculatorData;

  // Initialize inputs with defaults synchronously
  const initialInputs = calculatorData && calculatorData.inputs ?
    calculatorData.inputs.reduce((acc: Record<string, number | string | boolean>, input: any) => {
      if (input.id && input.default !== undefined) {
        acc[input.id] = input.default;
      }
      return acc;
    }, {}) : {};

  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>(initialInputs);
  const [results, setResults] = useState<Record<string, number>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (calculatorData && Object.keys(inputs).length > 0) {
      try {
        const calcResults = calculateResults(calculatorData.id, inputs);
        // Ensure all results are numbers and format them
        const formattedResults: Record<string, number> = {};
        Object.entries(calcResults).forEach(([key, value]) => {
          formattedResults[key] = typeof value === 'number' && !isNaN(value) ? value : 0;
        });
        setResults(formattedResults);
      } catch (error) {
        console.error('Calculation error:', error);
        // Fallback to zero results
        setResults({});
      }
    }
  }, [inputs, calculatorData]);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (calculatorData && Object.keys(inputs).length > 0) {
      // Ensure all required input variables are available
      const requiredInputs = calculatorData.inputs?.map((input: any) => input.id) || [];
      const hasAllInputs = requiredInputs.every((inputId: string) => inputs[inputId] !== undefined);

      if (hasAllInputs) {
        const calcResults = calculateResults(calculatorData.id, inputs);
        setResults(calcResults);
      }
    }
  }, [inputs, calculatorData]);

  const handleInputChange = (id: string, value: string | boolean) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const calculate = () => {
    if (calculatorData) {
      const calcResults = calculateResults(calculatorData.id, inputs);
      setResults(calcResults);
    }
  };

  const getIntroContent = () => {
    if (pageData.primaryKeyword === 'hourly to salary calculator') {
      return 'Converting between hourly wages and annual salaries is essential when comparing job offers. This calculator helps you understand the true value of different compensation structures. Whether you\'re paid hourly, salaried, or have a combination arrangement, you\'ll see your equivalent annual earnings, monthly take-home pay, and hourly rate equivalents. Perfect for career planning and salary negotiations.';
    }
    return `Use our ${pageData.primaryKeyword} to calculate your results instantly.`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
      </Head>

      {/* Main Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Column */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{pageData.h1}</h1>

            <div className="bg-white border border-gray-200 p-6 mb-6">
              {pageData.intro ? (
                typeof pageData.intro === 'string' ? (
                  <p className="text-gray-700 leading-relaxed">{pageData.intro}</p>
                ) : (
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>{pageData.intro.paragraph1}</p>
                    <p>{pageData.intro.paragraph2}</p>
                  </div>
                )
              ) : (
                <p className="text-gray-700 leading-relaxed">{getIntroContent()}</p>
              )}
            </div>

            {/* Differentiation Notice */}
            {pageData.differentiationNotice && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">{pageData.differentiationNotice.title}</span>
                </h3>
                <p className="text-blue-800 mb-4">{pageData.differentiationNotice.message}</p>
                {pageData.differentiationNotice.links && (
                  <div className="flex flex-wrap gap-3">
                    {pageData.differentiationNotice.links.map((link: any, index: number) => (
                      <Link
                        key={index}
                        href={link.url}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {calculatorData && calculatorData.inputs && calculatorData.inputs.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{pageData.ui?.calculatorHeading || "Calculate Your Results"}</h2>

                {/* Basic Inputs - Compact Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {calculatorData.inputs.filter((input: any) => !input.advanced).map((input: any) => (
                    <div key={input.id} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {input.label}
                        {input.unit && <span className="text-xs text-gray-500 ml-1">({input.unit})</span>}
                      </label>
                      {input.type === 'select' ? (
                        <select
                          value={inputs[input.id]?.toString() || input.default?.toString() || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {input.options && input.options.map((option: any) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          value={inputs[input.id]?.toString() || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={input.placeholder || input.default?.toString() || '0'}
                          min={input.min}
                          max={input.max}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Advanced Options - Collapsible */}
                {calculatorData.inputs.some((input: any) => input.advanced) && (
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 mr-2 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Advanced Options
                    </button>

                    {showAdvanced && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {calculatorData.inputs.filter((input: any) => input.advanced).map((input: any) => (
                          <div key={input.id} className="space-y-1">
                            <label className="block text-sm font-medium text-gray-600">
                              {input.label}
                              {input.unit && <span className="text-xs text-gray-500 ml-1">({input.unit})</span>}
                            </label>
                            {input.type === 'boolean' ? (
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={inputs[input.id] || input.default || false}
                                  onChange={(e) => handleInputChange(input.id, e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{input.description || 'Enable'}</span>
                              </label>
                            ) : input.type === 'select' ? (
                              <select
                                value={inputs[input.id]?.toString() || input.default?.toString() || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {input.options && input.options.map((option: any) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="number"
                                value={inputs[input.id]?.toString() || ''}
                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={input.placeholder || input.default?.toString() || '0'}
                                min={input.min}
                                max={input.max}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Calculate Button */}
                <div className="mt-6">
                  <button
                    onClick={calculate}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors"
                  >
                    {pageData.ui?.calculateButton || "Calculate"}
                  </button>
                </div>

                {/* Streamlined Results Section */}
                <div className="mt-6">

                  {Object.keys(results).length > 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Salary Breakdown</h3>
                      </div>

                      {/* Results List - Compact Table Style */}
                      <div className="divide-y divide-gray-100">
                        {Object.entries(results).map(([key, value]) => {
                          const formattedValue = typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : String(value);
                          const label = calculatorData.outputLabels?.[key] || key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
                          const unit = calculatorData.outputUnits?.[key] || '';

                          let displayValue;
                          if (unit === '$/hour') {
                            displayValue = `$${formattedValue}/hour`;
                          } else if (unit === '/hour') {
                            displayValue = `${formattedValue}/hour`;
                          } else if (unit === '%') {
                            displayValue = `${formattedValue}%`;
                          } else if (unit) {
                            displayValue = `${unit}${formattedValue}`;
                          } else {
                            displayValue = formattedValue;
                          }

                          // Determine styling based on result type
                          let bgColor = 'bg-white';
                          let textColor = 'text-gray-900';
                          let borderColor = 'border-gray-100';
                          let icon = null;
                          let isHighlighted = false;

                          if (key.includes('net') || key.includes('takeHome')) {
                            bgColor = 'bg-green-50';
                            textColor = 'text-green-800';
                            borderColor = 'border-green-200';
                            icon = (
                              <svg className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            );
                          } else if (key.includes('tax') || key.includes('Tax') || key === 'usc' || key === 'prsi') {
                            bgColor = 'bg-red-50';
                            textColor = 'text-red-800';
                            borderColor = 'border-red-200';
                            icon = (
                              <svg className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                              </svg>
                            );
                          } else if (key.includes('pension') || key.includes('deduction') || key.includes('Deductions')) {
                            bgColor = 'bg-orange-50';
                            textColor = 'text-orange-800';
                            borderColor = 'border-orange-200';
                            icon = (
                              <svg className="w-4 h-4 text-orange-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            );
                          } else if (key.toLowerCase().includes('monthly') || key.toLowerCase().includes('weekly') || key.toLowerCase().includes('biweekly') || key.toLowerCase().includes('hourly')) {
                            // Highlight frequency-based results
                            bgColor = 'bg-blue-50';
                            textColor = 'text-blue-800';
                            borderColor = 'border-blue-300';
                            isHighlighted = true;
                            icon = (
                              <svg className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            );
                          }

                          return (
                            <div key={key} className={`${isHighlighted ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300' : bgColor} px-6 py-3 border-l-4 ${borderColor} hover:bg-opacity-80 transition-colors ${isHighlighted ? 'shadow-sm' : ''}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center flex-1 min-w-0">
                                  {icon}
                                  <span className={`text-sm ${isHighlighted ? 'font-semibold' : 'font-medium'} ${isHighlighted ? 'text-blue-900' : 'text-gray-700'} truncate`}>
                                    {label}
                                  </span>
                                </div>
                                <div className={`text-sm ${isHighlighted ? 'font-bold text-lg' : 'font-semibold'} ${textColor} ml-4 flex-shrink-0`}>
                                  {displayValue}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                      <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{pageData.ui?.noResultsText || "No results calculated yet"}</h3>
                      <p className="text-gray-600">Enter your salary details above and click Calculate to see your take-home pay breakdown.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* How This Salary Calculator Works Section */}
            {pageData.howItWorks && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">How This Salary Calculator Works</h2>
                <p className="text-gray-700 leading-relaxed">
                  {pageData.howItWorks}
                </p>
              </div>
            )}

            {/* What Is Gross vs Net Salary Section */}
            {pageData.whatIsGrossVsNet && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What Is Gross vs Net Salary?</h2>
                <p className="text-gray-700 leading-relaxed">
                  {pageData.whatIsGrossVsNet}
                </p>
              </div>
            )}

              {/* How Gross Salary Converts to Net Pay Section */}
              {pageData.howGrossConvertsToNet && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Gross Salary Converts to Net Pay</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howGrossConvertsToNet}
                  </p>
                </div>
              )}

              {/* What Is Take-Home Pay Section */}
              {pageData.whatIsTakeHomePay && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What Is Take-Home Pay?</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.whatIsTakeHomePay}
                  </p>
                </div>
              )}

              {/* How This Take-Home Pay Calculator Works Section */}
              {pageData.howCalculatorWorks && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How This Take-Home Pay Calculator Works</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howCalculatorWorks}
                  </p>
                </div>
              )}

              {/* Why Take-Home Pay Matters More Than Salary Section */}
              {pageData.whyTakeHomeMatters && pageData.whyTakeHomeMatters.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Take-Home Pay Matters More Than Salary</h2>
                  <ul className="space-y-2">
                    {pageData.whyTakeHomeMatters.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What Does Net to Gross Salary Mean Section */}
              {pageData.whatDoesNetToGrossMean && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What Does Net to Gross Salary Mean?</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.whatDoesNetToGrossMean}
                  </p>
                </div>
              )}

              {/* How Net Salary Converts Back to Gross Section */}
              {pageData.howNetConvertsToGross && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Net Salary Converts Back to Gross</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howNetConvertsToGross}
                  </p>
                </div>
              )}

              {/* When Should You Use a Net to Gross Calculator Section */}
              {pageData.whenToUseNetToGross && pageData.whenToUseNetToGross.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">When Should You Use a Net to Gross Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whenToUseNetToGross.map((use: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Hourly Pay Converts to Salary Section */}
              {pageData.howHourlyConvertsToSalary && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Hourly Pay Converts to Salary</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howHourlyConvertsToSalary}
                  </p>
                </div>
              )}

              {/* Factors That Affect Your Annual Salary Section */}
              {pageData.factorsAffectingSalary && pageData.factorsAffectingSalary.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Factors That Affect Your Annual Salary</h2>
                  <ul className="space-y-2">
                    {pageData.factorsAffectingSalary.map((factor: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* When to Use an Hourly to Salary Calculator Section */}
              {pageData.whenToUseHourlyToSalary && pageData.whenToUseHourlyToSalary.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use an Hourly to Salary Calculator</h2>
                  <ul className="space-y-2">
                    {pageData.whenToUseHourlyToSalary.map((use: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Bonuses Are Calculated Section */}
              {pageData.howBonusesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Bonuses Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howBonusesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Bonus Calculator Section */}
              {pageData.whyUseBonusCalculator && pageData.whyUseBonusCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Bonus Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseBonusCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Overtime Pay Is Calculated Section */}
              {pageData.howOvertimePayIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Overtime Pay Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howOvertimePayIsCalculated}
                  </p>
                </div>
              )}

              {/* When to Use an Overtime Calculator Section */}
              {pageData.whenToUseOvertimeCalculator && pageData.whenToUseOvertimeCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use an Overtime Calculator</h2>
                  <ul className="space-y-2">
                    {pageData.whenToUseOvertimeCalculator.map((use: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in the USA Section */}
              {pageData.howSalaryAfterTaxWorksUSA && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in the USA</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksUSA}
                  </p>
                </div>
              )}

              {/* How Salary After Tax Works in the UK Section */}
              {pageData.howSalaryAfterTaxWorksUK && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in the UK</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksUK}
                  </p>
                </div>
              )}

              {/* How Salary After Tax Works in Ireland Section */}
              {pageData.howSalaryAfterTaxWorksIreland && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Ireland</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksIreland}
                  </p>
                </div>
              )}

              {/* How Salary After Tax Works in Canada Section */}
              {pageData.howSalaryAfterTaxWorksCanada && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Canada</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksCanada}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Canada) Section */}
              {pageData.whyUseSalaryCalculatorCanada && pageData.whyUseSalaryCalculatorCanada.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Canada)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorCanada.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Australia Section */}
              {pageData.howSalaryAfterTaxWorksAustralia && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Australia</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksAustralia}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Australia) Section */}
              {pageData.whyUseSalaryCalculatorAustralia && pageData.whyUseSalaryCalculatorAustralia.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Australia)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorAustralia.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Germany Section */}
              {pageData.howSalaryAfterTaxWorksGermany && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Germany</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksGermany}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Germany) Section */}
              {pageData.whyUseSalaryCalculatorGermany && pageData.whyUseSalaryCalculatorGermany.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Germany)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorGermany.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in France Section */}
              {pageData.howSalaryAfterTaxWorksFrance && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in France</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksFrance}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (France) Section */}
              {pageData.whyUseSalaryCalculatorFrance && pageData.whyUseSalaryCalculatorFrance.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (France)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorFrance.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Spain Section */}
              {pageData.howSalaryAfterTaxWorksSpain && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Spain</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksSpain}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Spain) Section */}
              {pageData.whyUseSalaryCalculatorSpain && pageData.whyUseSalaryCalculatorSpain.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Spain)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorSpain.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in India Section */}
              {pageData.howSalaryAfterTaxWorksIndia && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in India</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksIndia}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (India) Section */}
              {pageData.whyUseSalaryCalculatorIndia && pageData.whyUseSalaryCalculatorIndia.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (India)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorIndia.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Singapore Section */}
              {pageData.howSalaryAfterTaxWorksSingapore && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Singapore</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksSingapore}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Singapore) Section */}
              {pageData.whyUseSalaryCalculatorSingapore && pageData.whyUseSalaryCalculatorSingapore.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Singapore)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorSingapore.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in the Netherlands Section */}
              {pageData.howSalaryAfterTaxWorksNetherlands && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in the Netherlands</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksNetherlands}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Netherlands) Section */}
              {pageData.whyUseSalaryCalculatorNetherlands && pageData.whyUseSalaryCalculatorNetherlands.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Netherlands)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorNetherlands.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Sweden Section */}
              {pageData.howSalaryAfterTaxWorksSweden && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Sweden</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksSweden}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Sweden) Section */}
              {pageData.whyUseSalaryCalculatorSweden && pageData.whyUseSalaryCalculatorSweden.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Sweden)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorSweden.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in Switzerland Section */}
              {pageData.howSalaryAfterTaxWorksSwitzerland && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in Switzerland</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksSwitzerland}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (Switzerland) Section */}
              {pageData.whyUseSalaryCalculatorSwitzerland && pageData.whyUseSalaryCalculatorSwitzerland.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (Switzerland)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorSwitzerland.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in New Zealand Section */}
              {pageData.howSalaryAfterTaxWorksNewZealand && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in New Zealand</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksNewZealand}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (New Zealand) Section */}
              {pageData.whyUseSalaryCalculatorNewZealand && pageData.whyUseSalaryCalculatorNewZealand.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (New Zealand)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorNewZealand.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary After Tax Works in South Africa Section */}
              {pageData.howSalaryAfterTaxWorksSouthAfrica && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary After Tax Works in South Africa</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryAfterTaxWorksSouthAfrica}
                  </p>
                </div>
              )}

              {/* Why Use a Salary Calculator (South Africa) Section */}
              {pageData.whyUseSalaryCalculatorSouthAfrica && pageData.whyUseSalaryCalculatorSouthAfrica.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary Calculator (South Africa)?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryCalculatorSouthAfrica.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How IT / Tech Salaries Are Calculated Section */}
              {pageData.howITTechSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How IT / Tech Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howITTechSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use an IT / Tech Salary Calculator Section */}
              {pageData.whyUseAnITTechSalaryCalculator && pageData.whyUseAnITTechSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use an IT / Tech Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAnITTechSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Healthcare Salaries Are Calculated Section */}
              {pageData.howHealthcareSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Healthcare Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howHealthcareSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Healthcare Salary Calculator Section */}
              {pageData.whyUseAHealthcareSalaryCalculator && pageData.whyUseAHealthcareSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Healthcare Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAHealthcareSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Engineering Salaries Are Calculated Section */}
              {pageData.howEngineeringSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Engineering Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howEngineeringSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use an Engineering Salary Calculator Section */}
              {pageData.whyUseAnEngineeringSalaryCalculator && pageData.whyUseAnEngineeringSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use an Engineering Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAnEngineeringSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Teacher Salaries Are Calculated Section */}
              {pageData.howTeacherSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Teacher Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howTeacherSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Teacher Salary Calculator Section */}
              {pageData.whyUseATeacherSalaryCalculator && pageData.whyUseATeacherSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Teacher Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseATeacherSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Finance / Banking Salaries Are Calculated Section */}
              {pageData.howFinanceBankingSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Finance / Banking Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howFinanceBankingSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Finance / Banking Salary Calculator Section */}
              {pageData.whyUseAFinanceBankingSalaryCalculator && pageData.whyUseAFinanceBankingSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Finance / Banking Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAFinanceBankingSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Retail Salaries Are Calculated Section */}
              {pageData.howRetailSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Retail Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howRetailSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Retail Salary Calculator Section */}
              {pageData.whyUseARetailSalaryCalculator && pageData.whyUseARetailSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Retail Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseARetailSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Construction Salaries Are Calculated Section */}
              {pageData.howConstructionSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Construction Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howConstructionSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Construction Salary Calculator Section */}
              {pageData.whyUseAConstructionSalaryCalculator && pageData.whyUseAConstructionSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Construction Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAConstructionSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Legal Salaries Are Calculated Section */}
              {pageData.howLegalSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Legal Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howLegalSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Legal / Lawyer Salary Calculator Section */}
              {pageData.whyUseALegalLawyerSalaryCalculator && pageData.whyUseALegalLawyerSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Legal / Lawyer Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseALegalLawyerSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Marketing / Sales Salaries Are Calculated Section */}
              {pageData.howMarketingSalesSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Marketing / Sales Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howMarketingSalesSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Marketing / Sales Salary Calculator Section */}
              {pageData.whyUseAMarketingSalesSalaryCalculator && pageData.whyUseAMarketingSalesSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Marketing / Sales Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAMarketingSalesSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Startup / Entrepreneur Salaries Are Calculated Section */}
              {pageData.howStartupEntrepreneurSalariesAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Startup / Entrepreneur Salaries Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howStartupEntrepreneurSalariesAreCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Startup / Entrepreneur Salary Calculator Section */}
              {pageData.whyUseAStartupEntrepreneurSalaryCalculator && pageData.whyUseAStartupEntrepreneurSalaryCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Startup / Entrepreneur Salary Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseAStartupEntrepreneurSalaryCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How EMI Is Calculated Section */}
              {pageData.howEmiIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How EMI Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howEmiIsCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Loan / EMI Calculator Section */}
              {pageData.whyUseALoanEmiCalculator && pageData.whyUseALoanEmiCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Loan / EMI Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseALoanEmiCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Salary vs Expenses Is Calculated Section */}
              {pageData.howSalaryVsExpensesIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary vs Expenses Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryVsExpensesIsCalculated}
                  </p>
                </div>
              )}

              {/* Why Use a Salary vs Expenses Calculator Section */}
              {pageData.whyUseASalaryVsExpensesCalculator && pageData.whyUseASalaryVsExpensesCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary vs Expenses Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseASalaryVsExpensesCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Take-Home vs Cost of Living Is Calculated Section */}
              {pageData.howTakeHomeVsCostOfLivingIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Take-Home vs Cost of Living Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howTakeHomeVsCostOfLivingIsCalculated}
                  </p>
                </div>
              )}

              {/* Why Use This Calculator Section */}
              {pageData.whyUseThisCalculator && pageData.whyUseThisCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseThisCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How Overtime, Bonus, and Tax Are Calculated Section */}
              {pageData.howOvertimeBonusAndTaxAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Overtime, Bonus, and Tax Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howOvertimeBonusAndTaxAreCalculated}
                  </p>
                </div>
              )}

              {/* How Salary Raise and Promotion Are Calculated Section */}
              {pageData.howSalaryRaiseAndPromotionAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary Raise and Promotion Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryRaiseAndPromotionAreCalculated}
                  </p>
                </div>
              )}

              {/* How Salary vs Freelance Income Is Calculated Section */}
              {pageData.howSalaryVsFreelanceIncomeIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Salary vs Freelance Income Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSalaryVsFreelanceIncomeIsCalculated}
                  </p>
                </div>
              )}

              {/* How Savings from Salary Is Calculated Section */}
              {pageData.howSavingsFromSalaryIsCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Savings from Salary Is Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howSavingsFromSalaryIsCalculated}
                  </p>
                </div>
              )}

              {/* How Retirement Contributions Are Calculated Section */}
              {pageData.howRetirementContributionsAreCalculated && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How Retirement Contributions Are Calculated</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howRetirementContributionsAreCalculated}
                  </p>
                </div>
              )}

              {/* Guide Steps for Take-Home Pay Calculation */}
              {pageData.step1IdentifyGrossSalary && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Step 1 — Identify Gross Salary</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.step1IdentifyGrossSalary}
                  </p>
                </div>
              )}

              {pageData.step2CalculateTaxes && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Step 2 — Calculate Taxes</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.step2CalculateTaxes}
                  </p>
                </div>
              )}

              {pageData.step3DeductOtherExpenses && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Step 3 — Deduct Other Expenses</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.step3DeductOtherExpenses}
                  </p>
                </div>
              )}

              {pageData.step4CalculateNetSalary && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Step 4 — Calculate Net Salary</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.step4CalculateNetSalary}
                  </p>
                </div>
              )}

              {/* Guide Sections for Gross vs Net Salary */}
              {pageData.whatIsGrossSalary && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What is Gross Salary?</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.whatIsGrossSalary}
                  </p>
                </div>
              )}

              {pageData.whatIsNetSalary && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What is Net Salary?</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.whatIsNetSalary}
                  </p>
                </div>
              )}

              {pageData.keyDeductionsFromSalary && pageData.keyDeductionsFromSalary.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Key Deductions from Salary</h2>
                  <ul className="space-y-2">
                    {pageData.keyDeductionsFromSalary.map((deduction: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{deduction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guide Sections for Salary Negotiation */}
              {pageData.prepareBeforeNegotiation && pageData.prepareBeforeNegotiation.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Prepare Before Negotiation</h2>
                  <ul className="space-y-2">
                    {pageData.prepareBeforeNegotiation.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.duringTheNegotiation && pageData.duringTheNegotiation.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">During the Negotiation</h2>
                  <ul className="space-y-2">
                    {pageData.duringTheNegotiation.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.afterNegotiation && pageData.afterNegotiation.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">After Negotiation</h2>
                  <ul className="space-y-2">
                    {pageData.afterNegotiation.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.commonMistakesToAvoid && pageData.commonMistakesToAvoid.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
                  <ul className="space-y-2">
                    {pageData.commonMistakesToAvoid.map((mistake: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span className="text-gray-700">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guide Sections for Taxes by Country */}
              {pageData.commonTypesOfSalaryTaxes && pageData.commonTypesOfSalaryTaxes.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Common Types of Salary Taxes</h2>
                  <ul className="space-y-2">
                    {pageData.commonTypesOfSalaryTaxes.map((taxType: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{taxType}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.taxComparisonByCountry && pageData.taxComparisonByCountry.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Tax Comparison by Country</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Income Tax Rate</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Social Security</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Net Take-Home Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.taxComparisonByCountry.map((country: any, index: number) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-2 font-medium">{country.country}</td>
                            <td className="border border-gray-300 px-4 py-2">{country.incomeTax}</td>
                            <td className="border border-gray-300 px-4 py-2">{country.socialSecurity}</td>
                            <td className="border border-gray-300 px-4 py-2">{country.netExample}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {pageData.howToCalculateTaxes && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How to Calculate Taxes</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pageData.howToCalculateTaxes}
                  </p>
                </div>
              )}

              {/* Guide Sections for Salary Trends 2026 */}
              {pageData.globalSalaryTrends && pageData.globalSalaryTrends.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Global Salary Trends</h2>
                  <ul className="space-y-3">
                    {pageData.globalSalaryTrends.map((trend: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-3 text-lg">📈</span>
                        <span className="text-gray-700 leading-relaxed">{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pageData.industrySpecificTrends && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Industry-Specific Trends</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">IT & Tech</h3>
                      <p className="text-gray-700 mb-4">{pageData.industrySpecificTrends.itTech}</p>

                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Finance & Banking</h3>
                      <p className="text-gray-700 mb-4">{pageData.industrySpecificTrends.financeBanking}</p>

                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Healthcare</h3>
                      <p className="text-gray-700">{pageData.industrySpecificTrends.healthcare}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Engineering</h3>
                      <p className="text-gray-700 mb-4">{pageData.industrySpecificTrends.engineering}</p>

                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Marketing & Sales</h3>
                      <p className="text-gray-700 mb-4">{pageData.industrySpecificTrends.marketingSales}</p>

                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Emerging Industries</h3>
                      <p className="text-gray-700">{pageData.industrySpecificTrends.emergingIndustries}</p>
                    </div>
                  </div>
                </div>
              )}

              {pageData.salaryForecastsInsights && pageData.salaryForecastsInsights.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Salary Forecasts & Insights</h2>
                  <ul className="space-y-3">
                    {pageData.salaryForecastsInsights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-600 mr-3 text-lg">💡</span>
                        <span className="text-gray-700 leading-relaxed">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Use a Salary After Tax Calculator Section */}
              {pageData.whyUseSalaryAfterTaxCalculator && pageData.whyUseSalaryAfterTaxCalculator.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why Use a Salary After Tax Calculator?</h2>
                  <ul className="space-y-2">
                    {pageData.whyUseSalaryAfterTaxCalculator.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Use Cases Section */}
            {pageData.useCases && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h2>
                <div className="space-y-6">
                  {Object.entries(pageData.useCases).map(([key, example]: [string, any], index: number) => (
                    <div key={key} className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
                      <p className="text-gray-700 mb-3">
                        <strong>Scenario:</strong> {example.scenario}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Gross Salary:</strong> {example.grossSalary}</p>
                          {example.payeTax && <p><strong>PAYE Tax:</strong> {example.payeTax}</p>}
                          {example.usc && <p><strong>USC:</strong> {example.usc}</p>}
                          {example.prsi && <p><strong>PRSI:</strong> {example.prsi}</p>}
                          {example.pension && <p><strong>Pension:</strong> {example.pension}</p>}
                          {example.otherDeductions && <p><strong>Other Deductions:</strong> {example.otherDeductions}</p>}
                        </div>
                        <div>
                          {example.totalDeductions && <p><strong>Total Deductions:</strong> {example.totalDeductions}</p>}
                          <p><strong>Net Salary:</strong> {example.netSalary}</p>
                          {example.monthlyNet && <p><strong>Monthly Net:</strong> {example.monthlyNet}</p>}
                          {example.effectiveTaxRate && <p><strong>Effective Tax Rate:</strong> {example.effectiveTaxRate}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single Example Section (fallback) */}
            {!pageData.useCases && pageData.example && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Example Calculation</h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-gray-700">
                    <strong>{pageData.ui?.scenarioLabel || "Scenario:"}</strong> {pageData.example.scenario || "An employee earns €60,000 annually in gross salary with a 25% estimated tax rate."}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>{pageData.ui?.resultsLabel || "Results:"}</strong> {pageData.example.results || "Annual gross: €60,000 | Estimated tax: €15,000 | Annual net: €45,000 | Monthly net: €3,750"}
                  </p>
                </div>
              </div>
            )}

            {/* When to Use a Gross to Net Calculator Section */}
            {pageData.whenToUse && pageData.whenToUse.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use a Gross to Net Calculator</h2>
                <ul className="space-y-2">
                  {pageData.whenToUse.map((use: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips / Notes Section */}
            {pageData.tips && pageData.tips.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tips & Notes</h2>
                <ul className="space-y-2">
                  {pageData.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer Section */}
            {pageData.disclaimer && (
              <div className="bg-amber-50 border border-amber-200 p-4 mb-6 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-800 font-medium">
                      {typeof pageData.disclaimer === 'string' ? 'Important Notice' : pageData.disclaimer.title}
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      {typeof pageData.disclaimer === 'string' ? pageData.disclaimer : pageData.disclaimer.content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {pageData.faqs && pageData.faqs.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">❓ Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {pageData.faqs.map((faq: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Sharing */}
            {pageData.socialSharing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">{pageData.socialSharing.title}</h3>
                <div className="flex space-x-4">
                  {pageData.socialSharing.links.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span>{link.icon}</span>
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Universal Disclaimer */}
            {pageData.universalDisclaimer && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{pageData.universalDisclaimer.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-800 mb-2">{pageData.universalDisclaimer.title}</h3>
                    <p className="text-yellow-700 leading-relaxed">{pageData.universalDisclaimer.content}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Calculators Section */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore Our Salary Tools</h2>
              <p className="text-gray-600 mb-8 text-center">Discover comprehensive salary calculators and educational guides to understand your compensation better.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Main Tools */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    🧮 Main Tools
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Salary Calculator</a>
                    <a href="/en/gross-to-net-salary" className="block text-blue-600 hover:text-blue-800 text-sm">Gross to Net Calculator</a>
                    <a href="/en/take-home-pay-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Take-Home Pay Calculator</a>
                    <a href="/en/salary-after-tax-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Salary After Tax Calculator</a>
                  </div>
                </div>

                {/* Learn About Salary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    📚 Learn About Salary
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/guides/gross-vs-net-salary" className="block text-blue-600 hover:text-blue-800 text-sm">Gross vs Net Salary</a>
                    <a href="/en/guides/salary-negotiation-tips" className="block text-blue-600 hover:text-blue-800 text-sm">Salary Negotiation Tips</a>
                    <a href="/en/guides/how-to-calculate-take-home" className="block text-blue-600 hover:text-blue-800 text-sm">How to Calculate Take-Home Pay</a>
                    <a href="/en/guides/taxes-explained-by-country" className="block text-blue-600 hover:text-blue-800 text-sm">Taxes Explained by Country</a>
                  </div>
                </div>

                {/* By Country */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    🌍 By Country
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/usa-salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">USA Salary Calculator</a>
                    <a href="/en/uk-salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">UK Salary Calculator</a>
                    <a href="/en/ireland-salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Ireland Salary Calculator</a>
                  </div>
                </div>

                {/* By Industry */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    🏢 By Industry
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Technology & IT</a>
                    <a href="/en/salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Healthcare</a>
                    <a href="/en/salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Finance & Banking</a>
                    <a href="/en/salary-calculator" className="block text-blue-600 hover:text-blue-800 text-sm">Engineering</a>
                  </div>
                </div>

                {/* Financial Planning */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    📊 Financial Planning
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/guides/salary-negotiation-tips" className="block text-blue-600 hover:text-blue-800 text-sm">Salary Negotiation Tips</a>
                    <a href="/en/guides/gross-vs-net-salary" className="block text-blue-600 hover:text-blue-800 text-sm">Gross vs Net Salary</a>
                    <a href="/en/guides/how-to-calculate-take-home" className="block text-blue-600 hover:text-blue-800 text-sm">Calculate Take-Home Pay</a>
                    <a href="/en/guides/taxes-explained-by-country" className="block text-blue-600 hover:text-blue-800 text-sm">Tax Information</a>
                  </div>
                </div>

                {/* Tax & Benefits */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    💰 Tax & Benefits
                  </h3>
                  <div className="space-y-2">
                    <a href="/en/usa-bonus-tax" className="block text-blue-600 hover:text-blue-800 text-sm">USA Bonus Tax</a>
                    <a href="/en/uk-bonus-tax" className="block text-blue-600 hover:text-blue-800 text-sm">UK Bonus Tax</a>
                    <a href="/en/ireland-bonus-tax" className="block text-blue-600 hover:text-blue-800 text-sm">Ireland Bonus Tax</a>
                    <a href="/en/usa-overtime-pay" className="block text-blue-600 hover:text-blue-800 text-sm">USA Overtime Pay</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}