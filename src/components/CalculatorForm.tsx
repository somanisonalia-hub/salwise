'use client';

import React, { useState, useEffect } from 'react';
import { FormInput } from './FormInput';
import { ResultCard } from './ResultCard';

interface InputField {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select';
  default: number | string;
  unit?: string;
  options?: string[];
}

interface CalculatorFormProps {
  title: string;
  inputs: InputField[];
  calculateFunction: (values: Record<string, number | string>) => any;
  resultFormatter?: (result: any) => { title: string; results: Array<{ label: string; value: string | number; unit?: string; isPrimary?: boolean }> };
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  title,
  inputs,
  calculateFunction,
  resultFormatter
}) => {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initialValues: Record<string, number | string> = {};
    inputs.forEach(input => {
      initialValues[input.id] = input.default;
    });
    return initialValues;
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (id: string, value: number | string) => {
    setValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  useEffect(() => {
    try {
      const calculationResult = calculateFunction(values);
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult(null);
    }
  }, [values, calculateFunction]);

  const defaultResultFormatter = (result: any) => ({
    title: "Calculation Result",
    results: [
      { label: "Result", value: result || 0, isPrimary: true }
    ]
  });

  const formattedResult = resultFormatter
    ? resultFormatter(result)
    : defaultResultFormatter(result);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">Enter your details below to calculate your results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Details</h2>

          <form className="space-y-4">
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                id={input.id}
                label={input.label}
                type={input.type}
                value={values[input.id]}
                onChange={(value) => handleInputChange(input.id, value)}
                unit={input.unit}
                options={input.options}
              />
            ))}
          </form>
        </div>

        {/* Results */}
        <div>
          {result !== null && (
            <ResultCard
              title={formattedResult.title}
              results={formattedResult.results}
            />
          )}
        </div>
      </div>
    </div>
  );
};
