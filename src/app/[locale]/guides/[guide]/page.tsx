import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
    guide: string;
  }>;
}

// Only generate for English locale for Phase 1
const supportedLocales = ['en'];

export async function generateStaticParams() {
  const guides = [
    'how-to-calculate-take-home',
    'salary-negotiation-tips',
    'taxes-explained-by-country',
    'salary-trends-2026'
  ];

  const params: Array<{ locale: string; guide: string }> = [];

  // Only generate English pages for Phase 1
  for (const guide of guides) {
    params.push({ locale: 'en', guide });
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, guide } = await params;

  if (!supportedLocales.includes(locale)) {
    return {};
  }

  try {
    let content;
    if (locale === 'en') {
      content = require(`../../../../locales/en/guides/${guide}.json`);
    } else {
      try {
        content = require(`../../../../locales/${locale}/guides/${guide}.json`);
      } catch {
        content = require(`../../../../locales/en/guides/${guide}.json`);
      }
    }

    content = content.default || content;

    return {
      title: content.title || content.metaTitle,
      description: content.description || content.metaDescription,
      keywords: content.keywords || [content.primaryKeyword, ...content.longTailKeywords].join(', '),
    };
  } catch (error) {
    return {
      title: 'Guide Not Found',
      description: 'The guide you are looking for could not be found.',
    };
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, guide } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  let content;
  try {
    if (locale === 'en') {
      content = require(`../../../../locales/en/guides/${guide}.json`);
    } else {
      try {
        content = require(`../../../../locales/${locale}/guides/${guide}.json`);
      } catch {
        content = require(`../../../../locales/en/guides/${guide}.json`);
      }
    }
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-8">The guide you're looking for doesn't exist.</p>
          <Link href={`/${locale}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  content = content.default || content;

  return (
    <>
      <Head>
        <title>{content.title || content.metaTitle}</title>
        <meta name="description" content={content.description || content.metaDescription} />
        <meta name="keywords" content={content.keywords || [content.primaryKeyword, ...content.longTailKeywords].join(', ')} />
        <link rel="canonical" href={`https://salarywise.io/${locale}/guides/${guide}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData || {}) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{content.header?.title || content.h1}</h1>
                <p className="text-gray-600 mt-1">{content.header?.subtitle || 'Guide'}</p>
              </div>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {content.intro && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <p className="text-gray-700 mb-4">{content.intro.paragraph1}</p>
              <p className="text-gray-700">{content.intro.paragraph2}</p>
            </div>
          )}

          {/* Main Content */}
          {content.howGrossToNetCalculatorWorks && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-700">{content.howGrossToNetCalculatorWorks}</p>
            </div>
          )}

          {content.whatIsGrossVsNet && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What is Gross vs Net Salary?</h2>
              <p className="text-gray-700">{content.whatIsGrossVsNet}</p>
            </div>
          )}

          {content.howThisGuideWorks && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How This Guide Helps</h2>
              <p className="text-gray-700">{content.howThisGuideWorks}</p>
            </div>
          )}

          {/* Basic Formula */}
          {content.basicFormula && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.basicFormula.title}</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <code className="text-lg font-mono text-blue-600">{content.basicFormula.formula}</code>
              </div>
              <p className="text-gray-700">{content.basicFormula.explanation}</p>
            </div>
          )}

          {/* Common Deductions */}
          {content.commonDeductions && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.commonDeductions.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(content.commonDeductions).filter(([key]) => key !== 'title').map(([key, deduction]: [string, any], index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{deduction.title}</h3>
                    <p className="text-gray-600 mb-2">{deduction.description}</p>
                    {deduction.examples && (
                      <ul className="text-sm text-gray-500 space-y-1">
                        {deduction.examples.map((example: string, exIndex: number) => (
                          <li key={exIndex}>• {example}</li>
                        ))}
                      </ul>
                    )}
                    {deduction.note && <p className="text-sm text-blue-600 mt-2">{deduction.note}</p>}
                    {deduction.additional && <p className="text-sm text-orange-600 mt-2">{deduction.additional}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step Guide */}
          {content.stepByStep && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.stepByStep.title}</h2>
              <div className="space-y-6">
                {content.stepByStep.steps.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      {step.note && <p className="text-sm text-blue-600">{step.note}</p>}
                      {step.examples && (
                        <ul className="text-sm text-gray-500 space-y-1 mt-2">
                          {step.examples.map((example: string, exIndex: number) => (
                            <li key={exIndex}>• {example}</li>
                          ))}
                        </ul>
                      )}
                      {step.total && <p className="text-sm font-medium text-green-600 mt-2">{step.total}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tax Calculation Methods */}
          {content.taxCalculationMethods && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.taxCalculationMethods.title}</h2>
              <div className="space-y-4">
                {content.taxCalculationMethods.methods.map((method: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-700 mb-2">{method.description}</p>
                    {method.pros && (
                      <div className="mb-2">
                        <span className="font-medium text-green-700">Pros:</span>
                        <ul className="text-sm text-gray-600 ml-4 mt-1">
                          {method.pros.map((pro: string, proIndex: number) => (
                            <li key={proIndex}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {method.cons && (
                      <div>
                        <span className="font-medium text-red-700">Cons:</span>
                        <ul className="text-sm text-gray-600 ml-4 mt-1">
                          {method.cons.map((con: string, conIndex: number) => (
                            <li key={conIndex}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Country Examples */}
          {content.countryExamples && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.countryExamples.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.countryExamples.countries.map((country: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{country.name}</h3>
                    <p className="text-gray-600 mb-3">{country.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Income Tax:</span>
                        <span className="text-sm font-medium">{country.incomeTax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Social Security:</span>
                        <span className="text-sm font-medium">{country.socialSecurity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Take-home Rate:</span>
                        <span className="text-sm font-medium text-green-600">{country.takeHomeRate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tax Principles */}
          {content.taxPrinciples && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.taxPrinciples.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.taxPrinciples.principles.map((principle: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{principle.principle}</h3>
                    <p className="text-gray-600 mb-2">{principle.description}</p>
                    <p className="text-sm text-blue-600"><strong>Countries:</strong> {principle.countries}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Country Comparisons */}
          {content.countryComparisons && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.countryComparisons.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Income Tax</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Social Security</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Unique Features</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Effective Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.countryComparisons.countries.map((country: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">{country.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{country.incomeTax}</td>
                        <td className="border border-gray-300 px-4 py-2">{country.socialSecurity}</td>
                        <td className="border border-gray-300 px-4 py-2">{country.uniqueFeatures}</td>
                        <td className="border border-gray-300 px-4 py-2">{country.effectiveRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Understanding Taxes */}
          {content.understandingTaxes && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.understandingTaxes.title}</h2>
              <div className="space-y-6">
                {content.understandingTaxes.sections.map((section: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                    <p className="text-gray-700 mb-4">{section.content}</p>
                    {section.points && (
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {section.points.map((point: string, pointIndex: number) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preparation Section */}
          {content.preparation && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.preparation.title}</h2>
              <div className="space-y-6">
                {content.preparation.steps.map((step: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    {step.tools && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tools & Resources:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {step.tools.map((tool: string, toolIndex: number) => (
                            <li key={toolIndex} dangerouslySetInnerHTML={{ __html: tool }} />
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.examples && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {step.examples.map((example: string, exIndex: number) => (
                            <li key={exIndex}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.considerations && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Consider:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {step.considerations.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timing Section */}
          {content.timing && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.timing.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.timing.bestTimes.map((time: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{time.situation}</h3>
                    <p className="text-sm text-blue-600 mb-2"><strong>When:</strong> {time.when}</p>
                    <p className="text-sm text-gray-700"><strong>Why:</strong> {time.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategies Section */}
          {content.strategies && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.strategies.title}</h2>
              <div className="space-y-6">
                {content.strategies.techniques.map((technique: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{technique.title}</h3>
                    <p className="text-gray-700 mb-4">{technique.description}</p>
                    {technique.example && (
                      <div className="bg-gray-50 p-3 rounded mb-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">Example:</p>
                        <p className="text-sm text-gray-700 italic">"{technique.example}"</p>
                      </div>
                    )}
                    {technique.why && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Why it works:</h4>
                        <p className="text-gray-600">{technique.why}</p>
                      </div>
                    )}
                    {technique.consider && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Consider:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {technique.consider.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scripts Section */}
          {content.scripts && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.scripts.title}</h2>
              <div className="space-y-6">
                {Object.entries(content.scripts).filter(([key]) => key !== 'title').map(([key, script]: [string, any], index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{script.title}</h3>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-700 italic">"{script.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes Section */}
          {content.commonMistakes && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.commonMistakes.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.commonMistakes.mistakes.map((mistake: any, index: number) => (
                  <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">{mistake.title}</h3>
                    <p className="text-red-700 text-sm">{mistake.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Analysis */}
          {content.marketAnalysis && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.marketAnalysis.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.marketAnalysis.factors.map((factor: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{factor.title}</h3>
                    <p className="text-gray-600 mb-2">{factor.description}</p>
                    <div className="text-sm text-gray-500">
                      <strong>Impact:</strong> {factor.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Economic Factors */}
          {content.economicFactors && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.economicFactors.title}</h2>
              <div className="space-y-4">
                {content.economicFactors.factors.map((factor: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{factor.factor}</h3>
                    <p className="text-gray-700 mb-4">{factor.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="font-medium text-blue-900 text-sm">Prediction</div>
                        <div className="text-blue-700">{factor.prediction}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <div className="font-medium text-green-900 text-sm">Impact</div>
                        <div className="text-green-700">{factor.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Impact */}
          {content.technologyImpact && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.technologyImpact.title}</h2>
              <div className="space-y-6">
                {content.technologyImpact.impacts.map((impact: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{impact.technology}</h3>
                    <p className="text-gray-700 mb-4">{impact.currentImpact}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 p-3 rounded">
                        <div className="font-medium text-purple-900 text-sm">Prediction</div>
                        <div className="text-purple-700">{impact.prediction}</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <div className="font-medium text-orange-900 text-sm">Affected Roles</div>
                        <div className="text-orange-700 text-sm">{impact.affectedRoles}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Salary Projections */}
          {content.salaryProjections && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.salaryProjections.title}</h2>
              <div className="space-y-4">
                {content.salaryProjections.projections.map((projection: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{projection.title}</h3>
                    <p className="text-gray-700 mb-2">{projection.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Expected Growth:</span>
                        <span className="ml-2 font-medium text-green-600">{projection.growth}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time Frame:</span>
                        <span className="ml-2 font-medium">{projection.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calculator Recommendations */}
          {content.calculatorRecommendations && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.calculatorRecommendations.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.calculatorRecommendations.calculators.map((calc: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{calc.name}</h3>
                    <p className="text-gray-600 mb-3">{calc.description}</p>
                    <p className="text-sm text-blue-600 mb-3"><strong>Use when:</strong> {calc.whenToUse}</p>
                    <Link
                      href={calc.link}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Use Calculator
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases / Examples */}
          {content.useCases && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Examples & Use Cases</h2>
              <div className="space-y-4">
                {content.useCases.map((useCase: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-2">{useCase.scenario}</p>
                    {useCase.ukNet && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="font-medium text-blue-900">USA Net Pay</div>
                          <div className="text-blue-700">{useCase.usaNet}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="font-medium text-green-900">UK Net Pay</div>
                          <div className="text-green-700">{useCase.ukNet}</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded">
                          <div className="font-medium text-orange-900">Ireland Net Pay</div>
                          <div className="text-orange-700">{useCase.irelandNet}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Worked Examples */}
          {content.workedExamples && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Worked Examples</h2>
              <div className="space-y-4">
                {Object.entries(content.workedExamples).map(([key, example]: [string, any], index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{example.title}</h3>
                    <p className="text-gray-600 mb-3">{example.description}</p>
                    {example.steps && (
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        {example.steps.map((step: string, stepIndex: number) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {content.faqs && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faqs.map((faq: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calculator Chooser */}
          {content.calculatorChooser && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.calculatorChooser.title}</h2>
              <p className="text-gray-700 mb-6">{content.calculatorChooser.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.calculatorChooser.calculators.map((calc: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{calc.name}</h3>
                    <p className="text-gray-600 mb-3">{calc.purpose}</p>
                    <p className="text-sm text-blue-600 mb-3"><strong>Best for:</strong> {calc.bestFor}</p>
                    <Link
                      href={calc.url}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Use Calculator
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who Should Use This */}
          {content.whoShouldUseThisCalculator && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Who Should Use This Guide?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {content.whoShouldUseThisCalculator.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="bg-blue-600 text-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Calculate?</h2>
            <p className="mb-4">Put your knowledge into practice with our salary calculators.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/salary-calculator`}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Try Salary Calculator
              </Link>
              <Link
                href={`/${locale}/guides`}
                className="border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View All Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
