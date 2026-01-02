import React from 'react';

interface ResultItem {
  label: string;
  value: string | number;
  unit?: string;
  isPrimary?: boolean;
}

interface ResultCardProps {
  title: string;
  results: ResultItem[];
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  results,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <span className="text-gray-600">{result.label}:</span>
            <span className={`font-semibold ${
              result.isPrimary
                ? 'text-2xl text-blue-600'
                : 'text-lg text-gray-900'
            }`}>
              {typeof result.value === 'number'
                ? result.value.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  })
                : result.value}
              {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
