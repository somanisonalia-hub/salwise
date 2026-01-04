import calculatorInputsData from '../../CALCULATOR_INPUT_MASTER_TABLE.json';


export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox' | 'text' | 'slider';
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  default?: any;
  options?: Array<{value: string, label: string}>;
  conditional?: string;
  description?: string;
}

export interface CalculatorInputConfig {
  mandatory: string[];
  optional: string[];
}

/**
 * Get input configuration for a specific calculator
 */
export function getCalculatorInputConfig(calculatorSlug: string): CalculatorInputConfig {
  const calculatorInputs = (calculatorInputsData as any).calculatorInputs;
  if (!calculatorInputs) {
    console.error('calculatorInputs not found in calculatorInputsData');
    return { mandatory: [], optional: [] };
  }
  const config = calculatorInputs[calculatorSlug];
  if (!config) {
    console.warn(`No input configuration found for calculator: ${calculatorSlug}`);
    return { mandatory: [], optional: [] };
  }
  return config;
}

/**
 * Get full input definition for a specific input ID
 */
export function getInputDefinition(inputId: string): CalculatorInput | null {
  const inputDefinitions = (calculatorInputsData as any).inputDefinitions;
  if (!inputDefinitions) {
    return null;
  }
  const definition = inputDefinitions[inputId];
  if (!definition) {
    return null;
  }
  return { ...definition, id: inputId };
}

/**
 * Get all input definitions for a calculator
 */
export function getCalculatorInputs(calculatorSlug: string): CalculatorInput[] {
  const config = getCalculatorInputConfig(calculatorSlug);
  const inputs: CalculatorInput[] = [];

  // Add mandatory inputs
  config.mandatory.forEach(inputId => {
    const definition = getInputDefinition(inputId);
    if (definition) {
      inputs.push({ ...definition, required: true });
    }
  });

  // Add optional inputs
  config.optional.forEach(inputId => {
    const definition = getInputDefinition(inputId);
    if (definition) {
      inputs.push({ ...definition });
    }
  });

  return inputs;
}

/**
 * Check if an input should be visible based on conditions
 */
export function isInputVisible(input: CalculatorInput, formValues: Record<string, any>): boolean {
  if (!input.conditional) {
    return true; // No condition, always visible
  }

  const conditionValue = formValues[input.conditional];
  return Boolean(conditionValue); // Show if conditional input is truthy
}

/**
 * Validate calculator inputs
 */
export function validateCalculatorInputs(
  calculatorSlug: string,
  formValues: Record<string, any>
): { isValid: boolean; errors: Record<string, string> } {
  const config = getCalculatorInputConfig(calculatorSlug);
  const inputs = getCalculatorInputs(calculatorSlug);
  const errors: Record<string, string> = {};

  // Check mandatory inputs
  config.mandatory.forEach(inputId => {
    const input = inputs.find(i => i.id === inputId);
    const value = formValues[inputId];

    if (input?.required && (value === undefined || value === null || value === '')) {
      errors[inputId] = `${input.label} is required`;
    }

    // Type-specific validation
    if (input?.type === 'number' && value !== undefined && value !== null) {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[inputId] = `${input.label} must be a valid number`;
      } else {
        if (input.min !== undefined && numValue < input.min) {
          errors[inputId] = `${input.label} must be at least ${input.min}`;
        }
        if (input.max !== undefined && numValue > input.max) {
          errors[inputId] = `${input.label} must be at most ${input.max}`;
        }
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Get default values for calculator inputs
 */
export function getCalculatorDefaults(calculatorSlug: string): Record<string, any> {
  const inputs = getCalculatorInputs(calculatorSlug);
  const defaults: Record<string, any> = {};

  inputs.forEach(input => {
    if (input.default !== undefined) {
      defaults[input.id] = input.default;
    } else if (input.type === 'number') {
      defaults[input.id] = 0;
    } else if (input.type === 'checkbox') {
      defaults[input.id] = false;
    } else if (input.type === 'select' && input.options && input.options.length > 0) {
      defaults[input.id] = input.options[0].value;
    } else {
      defaults[input.id] = '';
    }
  });

  return defaults;
}

/**
 * Get country-specific input customizations
 */
export function getCountrySpecificInputs(country: string): Partial<CalculatorInput> {
  const customizations: Record<string, Partial<CalculatorInput>> = {
    'IE': {
      unit: '€'
    },
    'UK': {
      unit: '£'
    },
    'US': {
      unit: '$'
    }
  };

  return customizations[country] || {};
}

/**
 * Export all calculator slugs for validation
 */
export const VALID_CALCULATOR_SLUGS = Object.keys((calculatorInputsData as any).calculatorInputs);

/**
 * Map calculator ID to slug for input configuration
 */
export function mapCalculatorIdToSlug(calculatorId: string): string {
  const mappings: Record<string, string> = {
    'irelandSalaryCalculator': 'ireland-salary-calculator',
    'ukSalaryCalculator': 'uk-salary-calculator',
    'usaSalaryCalculator': 'usa-salary-calculator',
    'irelandHourlyToSalary': 'ireland-hourly-to-salary',
    'ukHourlyToSalary': 'uk-hourly-to-salary',
    'usaHourlyToSalary': 'usa-hourly-to-salary',
    'irelandOvertimePay': 'ireland-overtime-pay',
    'ukOvertimePay': 'uk-overtime-pay',
    'usaOvertimePay': 'usa-overtime-pay',
    'irelandBonusTax': 'ireland-bonus-tax',
    'ukBonusTax': 'uk-bonus-tax',
    'usaBonusTax': 'usa-bonus-tax',
    'irelandContractorSalary': 'ireland-contractor-salary-calculator',
    'ukContractorSalary': 'uk-contractor-salary-calculator',
    'usaContractorSalary': 'usa-contractor-salary-calculator',
    'globalSalary': 'salary-calculator',
    'grossToNet': 'gross-to-net-salary',
    'takeHomePay': 'take-home-pay-calculator',
    'salaryAfterTaxIreland': 'salary-after-tax-calculator'
  };

  return mappings[calculatorId] || calculatorId;
}

/**
 * Map master table input IDs to calculator formula variable names
 */
export function mapInputsForCalculator(slug: string, inputs: Record<string, any>): Record<string, any> {
  // Common mappings for all calculators
  const commonMappings: Record<string, string> = {
    'paymentFrequency': 'payFrequency',
    'pensionPercent': 'pensionContribution',
    'bonus': 'annualBonus',
    'hoursPerWeek': 'weeklyHours',
    'annualContractValue': 'contractValue',
    'contractorType': 'structure'
  };

  // Calculator-specific mappings
  const specificMappings: Record<string, Record<string, string>> = {
    'salary-calculator': {
      'salaryType': 'salaryType',
      'benefitsValue': 'benefitsValue',
      'paidTimeOff': 'paidTimeOff',
      'retirementContribution': 'retirementContribution',
      'workHoursPerWeek': 'workHoursPerWeek',
      'employmentType': 'employmentType'
    }
  };

  const calculatorMappings = { ...commonMappings, ...(specificMappings[slug] || {}) };
  const mappedInputs: Record<string, any> = { ...inputs };

  // Apply mappings
  Object.entries(calculatorMappings).forEach(([from, to]) => {
    if (mappedInputs[from] !== undefined) {
      mappedInputs[to] = mappedInputs[from];
      // Keep the original key as well for backward compatibility
      mappedInputs[from] = mappedInputs[from];
    }
  });

  return mappedInputs;
}

/**
 * Check if a calculator slug is valid
 */
export function isValidCalculatorSlug(slug: string): boolean {
  return VALID_CALCULATOR_SLUGS.includes(slug);
}