// Calculator engine for evaluating formulas from calculators.json

export interface CalculatorInput {
  id: string;
  label: string;
  type: string;
  default: number | string;
  unit?: string;
}

export interface CalculatorFormula {
  [key: string]: string | undefined; // Formula expressions as strings
}

export interface Calculator {
  id: string;
  name: string;
  inputs: CalculatorInput[];
  formula: CalculatorFormula;
}

export interface CalculatorsData {
  calculators: Calculator[];
}

// Import all calculators directly (synchronous)
import globalSalaryData from '../data/calculators/globalSalary.json';
import grossToNetData from '../data/calculators/grossToNet.json';
import takeHomePayData from '../data/calculators/takeHomePay.json';
import netToGrossData from '../data/calculators/netToGross.json';
import hourlyToSalaryData from '../data/calculators/hourlyToSalary.json';
import bonusCalculatorData from '../data/calculators/bonusCalculator.json';
import overtimePayData from '../data/calculators/overtimePay.json';
import salaryAfterTaxUSAData from '../data/calculators/salaryAfterTaxUSA.json';
import salaryAfterTaxUKData from '../data/calculators/salaryAfterTaxUK.json';
import salaryAfterTaxIrelandData from '../data/calculators/salaryAfterTaxIreland.json';
import salaryCalculatorCanadaData from '../data/calculators/salaryCalculatorCanada.json';
import salaryCalculatorAustraliaData from '../data/calculators/salaryCalculatorAustralia.json';
import salaryCalculatorGermanyData from '../data/calculators/salaryCalculatorGermany.json';
import salaryCalculatorFranceData from '../data/calculators/salaryCalculatorFrance.json';
import salaryCalculatorSpainData from '../data/calculators/salaryCalculatorSpain.json';
import salaryCalculatorIndiaData from '../data/calculators/salaryCalculatorIndia.json';
import salaryCalculatorSingaporeData from '../data/calculators/salaryCalculatorSingapore.json';
import salaryCalculatorNetherlandsData from '../data/calculators/salaryCalculatorNetherlands.json';
import salaryCalculatorSwedenData from '../data/calculators/salaryCalculatorSweden.json';
import salaryCalculatorSwitzerlandData from '../data/calculators/salaryCalculatorSwitzerland.json';
import salaryCalculatorNewZealandData from '../data/calculators/salaryCalculatorNewZealand.json';
import salaryCalculatorSouthAfricaData from '../data/calculators/salaryCalculatorSouthAfrica.json';
import salaryCalculatorITTechData from '../data/calculators/salaryCalculatorITTech.json';
import salaryCalculatorHealthcareData from '../data/calculators/salaryCalculatorHealthcare.json';
import salaryCalculatorEngineeringData from '../data/calculators/salaryCalculatorEngineering.json';
import salaryCalculatorTeacherData from '../data/calculators/salaryCalculatorTeacher.json';
import salaryCalculatorFinanceBankingData from '../data/calculators/salaryCalculatorFinanceBanking.json';
import salaryCalculatorRetailData from '../data/calculators/salaryCalculatorRetail.json';
import salaryCalculatorConstructionData from '../data/calculators/salaryCalculatorConstruction.json';
import salaryCalculatorLegalData from '../data/calculators/salaryCalculatorLegal.json';
import salaryCalculatorMarketingSalesData from '../data/calculators/salaryCalculatorMarketingSales.json';
import salaryCalculatorStartupEntrepreneurData from '../data/calculators/salaryCalculatorStartupEntrepreneur.json';
import loanEmiCalculatorData from '../data/calculators/loanEmiCalculator.json';
import salaryVsExpensesCalculatorData from '../data/calculators/salaryVsExpensesCalculator.json';
import takeHomeVsCostOfLivingCalculatorData from '../data/calculators/takeHomeVsCostOfLivingCalculator.json';
import overtimeBonusTaxCalculatorData from '../data/calculators/overtimeBonusTaxCalculator.json';
import annualRaisePromotionCalculatorData from '../data/calculators/annualRaisePromotionCalculator.json';
import salaryVsFreelanceIncomeCalculatorData from '../data/calculators/salaryVsFreelanceIncomeCalculator.json';
import savingsFromSalaryCalculatorData from '../data/calculators/savingsFromSalaryCalculator.json';
import retirementContributionCalculatorData from '../data/calculators/retirementContributionCalculator.json';
// Add more imports as needed, or create a barrel export

const calculatorsData: Calculator[] = [
  globalSalaryData,
  grossToNetData,
  takeHomePayData,
  netToGrossData,
  hourlyToSalaryData,
  bonusCalculatorData,
  overtimePayData,
  salaryAfterTaxUSAData,
  salaryAfterTaxUKData,
  salaryAfterTaxIrelandData,
  salaryCalculatorCanadaData,
  salaryCalculatorAustraliaData,
  salaryCalculatorGermanyData,
  salaryCalculatorFranceData,
  salaryCalculatorSpainData,
  salaryCalculatorIndiaData,
  salaryCalculatorSingaporeData,
  salaryCalculatorNetherlandsData,
  salaryCalculatorSwedenData,
  salaryCalculatorSwitzerlandData,
  salaryCalculatorNewZealandData,
  salaryCalculatorSouthAfricaData,
  salaryCalculatorITTechData,
  salaryCalculatorHealthcareData,
  salaryCalculatorEngineeringData,
  salaryCalculatorTeacherData,
  salaryCalculatorFinanceBankingData,
  salaryCalculatorRetailData,
  salaryCalculatorConstructionData,
  salaryCalculatorLegalData,
  salaryCalculatorMarketingSalesData,
  salaryCalculatorStartupEntrepreneurData,
  loanEmiCalculatorData,
  salaryVsExpensesCalculatorData,
  takeHomeVsCostOfLivingCalculatorData,
  overtimeBonusTaxCalculatorData,
  annualRaisePromotionCalculatorData,
  salaryVsFreelanceIncomeCalculatorData,
  savingsFromSalaryCalculatorData,
  retirementContributionCalculatorData,
];

// Safe evaluation of mathematical expressions
function safeEval(expression: string, variables: Record<string, number | string>): number {
  try {
    // Create a safe evaluation context
    const context = { ...variables, Math };

    // Replace variable names with their values (handle both numbers and strings)
    let processedExpression = expression;
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      const value = variables[key];
      if (typeof value === 'string') {
        // Escape quotes for string values
        processedExpression = processedExpression.replace(regex, `'${value}'`);
      } else {
        processedExpression = processedExpression.replace(regex, value.toString());
      }
    });

    // Use Function constructor for safe evaluation (safer than eval)
    const result = new Function(...Object.keys(context), `return ${processedExpression}`)(
      ...Object.values(context)
    );

    return typeof result === 'number' && !isNaN(result) ? result : 0;
  } catch (error) {
    console.error('Formula evaluation error:', error instanceof Error ? error.message : String(error));
    return 0;
  }
}

// Calculate results for a given calculator
export function calculateResults(
  calculatorId: string,
  inputValues: Record<string, number | string>
): Record<string, number> {
  const calculator = calculatorsData.find(calc => calc.id === calculatorId);

  if (!calculator) {
    console.error(`Calculator ${calculatorId} not found`);
    return {};
  }

  const results: Record<string, number> = {};

  // Prepare all variables (both numeric and string)
  const allVariables: Record<string, number | string> = {};
  Object.entries(inputValues).forEach(([key, value]) => {
    if (typeof value === 'number') {
      allVariables[key] = value;
    } else if (typeof value === 'string' && !isNaN(Number(value))) {
      // Convert numeric strings to numbers
      allVariables[key] = parseFloat(value) || 0;
    } else {
      // Keep strings as strings
      allVariables[key] = value;
    }
  });

  // Evaluate formulas in order, allowing dependencies between results
  const formulaEntries = Object.entries(calculator.formula);

  formulaEntries.forEach(([resultKey, expression]) => {
    if (typeof expression === 'string') {
      // Combine input values with previously calculated results
      const currentVariables = { ...allVariables, ...results };
      results[resultKey] = safeEval(expression, currentVariables);
    }
  });

  return results;
}

// Get calculator by ID
export function getCalculator(calculatorId: string): Calculator | undefined {
  return calculatorsData.find(calc => calc.id === calculatorId);
}

// Get all calculators
export function getAllCalculators(): Calculator[] {
  return calculatorsData;
}

// Get calculators by type/category
export function getCalculatorsByType(type: 'global' | 'country'): Calculator[] {
  if (type === 'global') {
    return calculatorsData.filter(calc =>
      !calc.id.includes('Salary') || calc.id === 'globalSalary'
    );
  }
  return calculatorsData.filter(calc =>
    calc.id.includes('Salary') && calc.id !== 'globalSalary'
  );
}

// Format currency values
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Get default values for a calculator
export function getCalculatorDefaults(calculatorId: string): Record<string, number | string> {
  const calculator = getCalculator(calculatorId);
  if (!calculator) return {};

  const defaults: Record<string, number | string> = {};
  calculator.inputs.forEach(input => {
    defaults[input.id] = input.default;
  });

  return defaults;
}

// Validate calculator inputs
export function validateCalculatorInputs(
  calculatorId: string,
  values: Record<string, number | string>
): { isValid: boolean; errors: string[] } {
  const calculator = getCalculator(calculatorId);
  if (!calculator) {
    return { isValid: false, errors: ['Calculator not found'] };
  }

  const errors: string[] = [];

  calculator.inputs.forEach(input => {
    const value = values[input.id];

    if (input.type === 'number') {
      const numValue = typeof value === 'number' ? value : parseFloat(value as string);

      if (isNaN(numValue)) {
        errors.push(`${input.label} must be a valid number`);
      } else if (numValue < 0) {
        errors.push(`${input.label} cannot be negative`);
      }
    }

    if (value === undefined || value === null || value === '') {
      errors.push(`${input.label} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Note: Calculators are now loaded dynamically from individual files
