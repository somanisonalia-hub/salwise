// Basic calculator engine for salary calculations
import ukData from '../data/calculators/ukSalary.json';
import usaData from '../data/calculators/usaSalary.json';

interface Calculator {
  id: string;
  name: string;
  inputs: any[];
  outputs: any[];
}

const calculatorsData: Calculator[] = [
  ukData,
  usaData
];

export function getCalculator(calculatorId: string): Calculator | undefined {
  return calculatorsData.find(calc => calc.id === calculatorId);
}

export function calculateResults(calculatorId: string, inputs: Record<string, number>): Record<string, number> {
  const calculator = getCalculator(calculatorId);
  if (!calculator) return {};
  
  const results: Record<string, number> = {};
  
  // Simple calculation for now
  calculator.outputs.forEach(output => {
    if (output.id === 'netSalary' && inputs.grossSalary) {
      if (calculatorId === 'ukSalary') {
        results.netSalary = inputs.grossSalary * 0.78;
      } else if (calculatorId === 'usaSalary') {
        results.netSalary = inputs.grossSalary * 0.75;
      }
    }
  });
  
  return results;
}
