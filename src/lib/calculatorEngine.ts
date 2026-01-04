// Calculator engine for evaluating formulas from calculators.json

export interface CalculatorInput {
  id: string;
  label: string;
  type: string;
  default: number | string | boolean;
  unit?: string;
  options?: Array<{value: string, label: string}>;
  min?: number;
  max?: number;
  description?: string;
}

export interface CalculatorFormula {
  [key: string]: string | undefined; // Formula expressions as strings
}

export interface CalculatorOutput {
  id: string;
  label: string;
  type?: string;
  description?: string;
  unit?: string;
}

export interface Calculator {
  id: string;
  name: string;
  inputs: CalculatorInput[];
  outputs?: CalculatorOutput[];
  formula: CalculatorFormula;
}

export interface CalculatorsData {
  calculators: Calculator[];
}

// Import all calculators directly (synchronous)
import globalSalaryData from '../data/calculators/globalSalary.json';
import grossToNetData from '../data/calculators/grossToNet.json';
import takeHomePayData from '../data/calculators/takeHomePay.json';
import simpleTakeHomePayData from '../data/calculators/simpleTakeHomePay.json';
import netToGrossData from '../data/calculators/netToGross.json';
import hourlyToSalaryData from '../data/calculators/hourlyToSalary.json';
import bonusCalculatorData from '../data/calculators/bonusCalculator.json';
import overtimePayData from '../data/calculators/overtimePay.json';
import salaryAfterTaxUSAData from '../data/calculators/salaryAfterTaxUSA.json';
import salaryAfterTaxUKData from '../data/calculators/salaryAfterTaxUK.json';
import salaryAfterTaxIrelandData from '../data/calculators/salaryAfterTaxIreland.json';
import irelandSalaryCalculatorData from '../data/calculators/irelandSalaryCalculator';
import irelandHourlyToSalary from '../data/calculators/irelandHourlyToSalary.js';
import irelandOvertimePay from '../data/calculators/irelandOvertimePay.js';
import irelandBonusTax from '../data/calculators/irelandBonusTax.js';
import irelandContractorSalary from '../data/calculators/irelandContractorSalary.js';
import ukSalaryCalculator from '../data/calculators/ukSalaryCalculator.js';
import ukHourlyToSalary from '../data/calculators/ukHourlyToSalary.js';
import ukOvertimePay from '../data/calculators/ukOvertimePay.js';
import ukBonusTax from '../data/calculators/ukBonusTax.js';
import ukContractorSalary from '../data/calculators/ukContractorSalary.js';
import usaSalaryCalculator from '../data/calculators/usaSalaryCalculator.js';
import usaHourlyToSalary from '../data/calculators/usaHourlyToSalary.js';
import usaOvertimePay from '../data/calculators/usaOvertimePay.js';
import usaBonusTax from '../data/calculators/usaBonusTax.js';
import usaContractorSalary from '../data/calculators/usaContractorSalary.js';
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
import usaSalaryData from '../data/calculators/usaSalary.json';
import ukSalaryData from '../data/calculators/ukSalary.json';
import irelandSalaryData from '../data/calculators/irelandSalary.json';
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
  simpleTakeHomePayData,
  netToGrossData,
  hourlyToSalaryData,
  bonusCalculatorData,
  overtimePayData,
  usaSalaryData,
  ukSalaryData,
  irelandSalaryData,
  salaryAfterTaxUSAData,
  salaryAfterTaxUKData,
  salaryAfterTaxIrelandData,
  irelandSalaryCalculatorData,
  irelandHourlyToSalary,
  irelandOvertimePay,
  irelandBonusTax,
  irelandContractorSalary,
  ukSalaryCalculator,
  ukHourlyToSalary,
  ukOvertimePay,
  ukBonusTax,
  ukContractorSalary,
  usaSalaryCalculator,
  usaHourlyToSalary,
  usaOvertimePay,
  usaBonusTax,
  usaContractorSalary,
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

// US Federal Tax Calculation (2025 brackets)
function calculateFederalTax2025(taxableIncome: number, filingStatus: string): number {
  if (taxableIncome <= 0) return 0;

  // 2025 Federal tax brackets (adjusted for inflation)
  const brackets = {
    single: [
      { min: 0, max: 11500, rate: 0.10 },
      { min: 11500, max: 46525, rate: 0.12 },
      { min: 46525, max: 99150, rate: 0.22 },
      { min: 99150, max: 191025, rate: 0.24 },
      { min: 191025, max: 243200, rate: 0.32 },
      { min: 243200, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ],
    married_joint: [
      { min: 0, max: 23000, rate: 0.10 },
      { min: 23000, max: 93050, rate: 0.12 },
      { min: 93050, max: 198300, rate: 0.22 },
      { min: 198300, max: 382050, rate: 0.24 },
      { min: 382050, max: 486400, rate: 0.32 },
      { min: 486400, max: 729800, rate: 0.35 },
      { min: 729800, max: Infinity, rate: 0.37 }
    ],
    married_separate: [
      { min: 0, max: 11500, rate: 0.10 },
      { min: 11500, max: 46525, rate: 0.12 },
      { min: 46525, max: 99150, rate: 0.22 },
      { min: 99150, max: 191025, rate: 0.24 },
      { min: 191025, max: 243200, rate: 0.32 },
      { min: 243200, max: 364900, rate: 0.35 },
      { min: 364900, max: Infinity, rate: 0.37 }
    ],
    head_household: [
      { min: 0, max: 16100, rate: 0.10 },
      { min: 16100, max: 62650, rate: 0.12 },
      { min: 62650, max: 104300, rate: 0.22 },
      { min: 104300, max: 191025, rate: 0.24 },
      { min: 191025, max: 243200, rate: 0.32 },
      { min: 243200, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ],
    widow: [
      { min: 0, max: 23000, rate: 0.10 },
      { min: 23000, max: 93050, rate: 0.12 },
      { min: 93050, max: 198300, rate: 0.22 },
      { min: 198300, max: 382050, rate: 0.24 },
      { min: 382050, max: 486400, rate: 0.32 },
      { min: 486400, max: 729800, rate: 0.35 },
      { min: 729800, max: Infinity, rate: 0.37 }
    ]
  };

  const statusBrackets = brackets[filingStatus as keyof typeof brackets] || brackets.single;
  let tax = 0;

  for (const bracket of statusBrackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }

  return tax;
}

// US State Tax Calculation (2024 rates)
// US State Income Tax Calculation (2025 - using 2024 rates as placeholder)
function calculateStateTax2025(grossIncome: number, state: string): number {
  // State income tax rates (2024)
  const stateRates: Record<string, number> = {
    'CA': 0.133, // California
    'NY': 0.0882, // New York
    'IL': 0.0495, // Illinois
    'GA': 0.0575, // Georgia
    'PA': 0.0307, // Pennsylvania
    'NJ': 0.05525, // New Jersey
    'MA': 0.05, // Massachusetts
    'VA': 0.0575, // Virginia
    'MD': 0.0475, // Maryland
    'CT': 0.055, // Connecticut
    'MN': 0.0535, // Minnesota
    'CO': 0.0455, // Colorado
    'AZ': 0.0259, // Arizona
    'OR': 0.0475, // Oregon
    'MI': 0.0425, // Michigan
    'NC': 0.0499, // North Carolina
    // No state income tax
    'TX': 0, 'FL': 0, 'NV': 0, 'WA': 0, 'TN': 0, 'SD': 0, 'WY': 0, 'AK': 0
  };

  const rate = stateRates[state] || 0;
  return grossIncome * rate;
}

// Ireland Income Tax Calculation (2025)
function calculateIrelandIncomeTax(taxableIncome: number, taxCredits: number): number {
  // 2025 Irish tax brackets
  const entryRateLimit = 42335; // 20% rate up to €42,335
  const middleRateLimit = 70557; // 40% rate from €42,336 to €70,557
  // 48% rate above €70,557

  let incomeTax = 0;

  if (taxableIncome <= entryRateLimit) {
    incomeTax = taxableIncome * 0.20;
  } else if (taxableIncome <= middleRateLimit) {
    incomeTax = (entryRateLimit * 0.20) + ((taxableIncome - entryRateLimit) * 0.40);
  } else {
    incomeTax = (entryRateLimit * 0.20) + ((middleRateLimit - entryRateLimit) * 0.40) + ((taxableIncome - middleRateLimit) * 0.48);
  }

  // Apply tax credits
  return Math.max(0, incomeTax - taxCredits);
}

// Canada Federal Tax Calculation (2025)
function calculateCanadaFederalTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  // 2025 Canadian federal tax brackets
  const brackets = [
    { min: 0, max: 142292, rate: 0.15 },
    { min: 142292, max: 170751, rate: 0.20 },
    { min: 170751, max: 227091, rate: 0.24 },
    { min: 227091, rate: 0.29 }
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max || remainingIncome;
    const taxableInBracket = Math.min(remainingIncome, bracketMax - (bracket.min || 0));
    tax += taxableInBracket * bracket.rate;

    remainingIncome -= taxableInBracket;
  }

  return tax;
}

// Australia Income Tax Calculation (2025)
function calculateAustraliaIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  // 2025 Australian tax brackets (adjusted for inflation)
  const brackets = [
    { min: 0, max: 19000, rate: 0 },           // Tax-free threshold
    { min: 19000, max: 47000, rate: 0.19 },     // 19% bracket
    { min: 47000, max: 125000, rate: 0.325 },  // 32.5% bracket
    { min: 125000, rate: 0.37 }                // 37% bracket
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max || remainingIncome;
    const taxableInBracket = Math.min(remainingIncome, bracketMax - (bracket.min || 0));
    tax += taxableInBracket * bracket.rate;

    remainingIncome -= taxableInBracket;
  }

  return tax;
}

// Netherlands Income Tax Calculation (2025)
function calculateNetherlandsIncomeTax(taxableIncome: number, maritalStatus: string): number {
  if (taxableIncome <= 0) return 0;

  // Dutch tax brackets 2025 (simplified)
  const brackets = [
    { min: 0, max: 23750, rate: 0.195 },     // 19.5% bracket
    { min: 23750, max: 75200, rate: 0.334 }, // 33.4% bracket
    { min: 75200, rate: 0.495 }             // 49.5% bracket
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max || remainingIncome;
    const taxableInBracket = Math.min(remainingIncome, bracketMax - (bracket.min || 0));
    tax += taxableInBracket * bracket.rate;

    remainingIncome -= taxableInBracket;
  }

  // Apply basic tax credit
  const basicCredit = maritalStatus === 'married' ? 5696 : 3239;
  return Math.max(0, tax - basicCredit);
}

// Spain Income Tax Calculation (2025)
function calculateSpainIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  // Spanish tax brackets 2025 (simplified)
  const brackets = [
    { min: 0, max: 12450, rate: 0.19 },      // 19% bracket
    { min: 12450, max: 20200, rate: 0.24 },  // 24% bracket
    { min: 20200, max: 35200, rate: 0.30 },  // 30% bracket
    { min: 35200, max: 60000, rate: 0.37 },  // 37% bracket
    { min: 60000, rate: 0.47 }              // 47% bracket
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max || remainingIncome;
    const taxableInBracket = Math.min(remainingIncome, bracketMax - (bracket.min || 0));
    tax += taxableInBracket * bracket.rate;

    remainingIncome -= taxableInBracket;
  }

  return tax;
}

// France Income Tax Calculation (2025)
function calculateFranceIncomeTax(taxableIncome: number, maritalStatus: string, dependents: number): number {
  if (taxableIncome <= 0) return 0;

  // French tax brackets 2025 (simplified)
  const brackets = [
    { min: 0, max: 11294, rate: 0 },       // Tax-free allowance
    { min: 11294, max: 28797, rate: 0.11 }, // 11% bracket
    { min: 28797, max: 82341, rate: 0.30 }, // 30% bracket
    { min: 82341, max: 177106, rate: 0.41 }, // 41% bracket
    { min: 177106, rate: 0.45 }            // 45% bracket
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;

  // Apply tax credits based on marital status and dependents
  let taxCredit = 0;
  if (maritalStatus === 'married') {
    taxCredit += 3830; // Marriage tax credit
  }
  taxCredit += dependents * 1893; // Child tax credit (approximate)

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMax = bracket.max || remainingIncome;
    const taxableInBracket = Math.min(remainingIncome, bracketMax - (bracket.min || 0));
    tax += taxableInBracket * bracket.rate;

    remainingIncome -= taxableInBracket;
  }

  return Math.max(0, tax - taxCredit);
}

// Germany Income Tax Calculation (2025)
function calculateGermanyIncomeTax(annualGross: number, taxClass: string): number {
  if (annualGross <= 0) return 0;

  // Simplified German tax calculation based on tax class
  // This is a simplified version - actual German tax is more complex
  let taxRate = 0;

  switch (taxClass) {
    case '1': // Single
      taxRate = annualGross > 60000 ? 0.45 : annualGross > 30000 ? 0.35 : 0.25;
      break;
    case '3': // Married, higher earner
      taxRate = annualGross > 80000 ? 0.45 : annualGross > 40000 ? 0.35 : 0.25;
      break;
    case '4': // Married, both working
      taxRate = annualGross > 70000 ? 0.45 : annualGross > 35000 ? 0.35 : 0.25;
      break;
    case '5': // Married, lower earner
      taxRate = annualGross > 50000 ? 0.45 : annualGross > 25000 ? 0.35 : 0.20;
      break;
    default:
      taxRate = 0.25; // Default
  }

  return annualGross * taxRate;
}

// Australia Medicare Levy Calculation (2025)
function calculateAustraliaMedicareLevy(annualGross: number): number {
  const baseRate = 0.02; // 2% base rate
  const surchargeThreshold = 90000; // Income for surcharge
  const surchargeRate = 0.015; // 1.5% surcharge

  let levy = annualGross * baseRate;

  // Additional Medicare levy surcharge for high earners
  if (annualGross > surchargeThreshold) {
    levy += (annualGross - surchargeThreshold) * surchargeRate;
  }

  return levy;
}

// Canada Provincial Tax Calculation (2025)
function calculateCanadaProvincialTax(taxableIncome: number, province: string): number {
  if (taxableIncome <= 0) return 0;

  // Simplified 2025 provincial tax rates (approximate)
  const provincialRates: { [key: string]: number } = {
    'Alberta': 0.10,
    'British Columbia': 0.20,
    'Manitoba': 0.18,
    'New Brunswick': 0.18,
    'Newfoundland': 0.19,
    'Northwest Territories': 0.14,
    'Nova Scotia': 0.17,
    'Nunavut': 0.12,
    'Ontario': 0.13,
    'Prince Edward Island': 0.17,
    'Quebec': 0.15,
    'Saskatchewan': 0.18,
    'Yukon': 0.15
  };

  const rate = provincialRates[province] || 0.15; // Default to 15%
  return taxableIncome * rate;
}

// Ireland Universal Social Charge (USC) Calculation (2025)
function calculateIrelandUSC(annualGross: number): number {
  // 2026 USC rates and thresholds - updated for new calculator
  const threshold1 = 12012; // 0.5% up to €12,012
  const threshold2 = 25760; // 2% from €12,013 to €25,760
  const threshold3 = 70044; // 4% from €25,761 to €70,044
  // 8% above €70,044

  let usc = 0;

  if (annualGross <= threshold1) {
    usc = annualGross * 0.005;
  } else if (annualGross <= threshold2) {
    usc = (threshold1 * 0.005) + ((annualGross - threshold1) * 0.02);
  } else if (annualGross <= threshold3) {
    usc = (threshold1 * 0.005) +
          ((threshold2 - threshold1) * 0.02) +
          ((annualGross - threshold2) * 0.04);
  } else {
    usc = (threshold1 * 0.005) +
          ((threshold2 - threshold1) * 0.02) +
          ((threshold3 - threshold2) * 0.04) +
          ((annualGross - threshold3) * 0.08);
  }

  return usc;
}

// UK Income Tax Calculation (2025/26)
function calculateUKTax2025(annualIncome: number): number {
  const personalAllowance = 13120; // Increased by ~4% inflation
  const basicRateLimit = 52570; // Increased by ~4% inflation
  const higherRateLimit = 131250; // Increased by ~4% inflation

  const taxable = Math.max(0, annualIncome - personalAllowance);
  if (taxable <= (basicRateLimit - personalAllowance)) return taxable * 0.20;
  if (taxable <= (higherRateLimit - personalAllowance)) {
    return (basicRateLimit - personalAllowance) * 0.20 + (taxable - (basicRateLimit - personalAllowance)) * 0.40;
  }
  return (basicRateLimit - personalAllowance) * 0.20 + (higherRateLimit - basicRateLimit) * 0.40 +
         (taxable - (higherRateLimit - personalAllowance)) * 0.45;
}

// UK National Insurance Calculation (2025/26)
function calculateUKNI2025(annualIncome: number): number {
  if (annualIncome <= 13120) return 0; // Increased personal allowance

  let ni = 0;
  const primaryThreshold = 13120;
  const upperEarningsLimit = 52570; // Increased UEL

  if (annualIncome <= upperEarningsLimit) {
    ni = (annualIncome - primaryThreshold) * 0.08;
  } else {
    ni = (upperEarningsLimit - primaryThreshold) * 0.08 + (annualIncome - upperEarningsLimit) * 0.02;
  }

  return ni;
}

// UK Student Loan Repayment Calculation (2025/26)
function calculateStudentLoan(plan: string, annualIncome: number): number {
  const thresholds = {
    plan1: 25375, // Increased by ~4% inflation
    plan2: 28420, // Increased by ~4% inflation
    postgrad: 21850 // Increased by ~4% inflation
  };

  const rates = {
    plan1: 0.09,
    plan2: 0.09,
    postgrad: 0.06
  };

  const threshold = thresholds[plan as keyof typeof thresholds] || 28420;
  const rate = rates[plan as keyof typeof rates] || 0.09;

  if (annualIncome <= threshold) return 0;

  return (annualIncome - threshold) * rate;
}

// Calculate Marginal Tax Rate
function calculateMarginalTaxRate(taxableIncome: number, filingStatus: string, state: string): number {
  if (taxableIncome <= 0) return 0;

  // Federal marginal rate
  const federalBrackets = {
    single: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
    married_joint: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
    married_separate: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
    head_household: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37],
    widow: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
  };

  const brackets = federalBrackets[filingStatus as keyof typeof federalBrackets] || federalBrackets.single;
  const stateRate = calculateStateTax2025(1000, state) / 1000; // Get state rate

  // Find federal marginal bracket
  let federalMarginal = 0.37; // Default highest rate
  const federalLimits = {
    single: [11000, 44725, 95375, 182100, 231250, 578125],
    married_joint: [22000, 89450, 190750, 364200, 462500, 693750],
    married_separate: [11000, 44725, 95375, 182100, 231250, 346875],
    head_household: [15700, 59850, 95350, 182100, 231250, 578100],
    widow: [22000, 89450, 190750, 364200, 462500, 693750]
  };

  const limits = federalLimits[filingStatus as keyof typeof federalLimits] || federalLimits.single;

  for (let i = 0; i < limits.length; i++) {
    if (taxableIncome <= limits[i]) {
      federalMarginal = brackets[i];
      break;
    }
  }

  return (federalMarginal + stateRate) * 100;
}

// Calculate gross salary from net salary (reverse tax calculation)
function calculateGrossFromNet(netSalary: number, country: string): number {
  // Iterative approach to estimate gross from net
  // Start with net as initial guess and work backwards
  let gross = netSalary;
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    const tax = calculateCountryTax(gross, country);
    const calculatedNet = gross - tax;

    // If we're close enough, return the result
    if (Math.abs(calculatedNet - netSalary) < 1) {
      return gross;
    }

    // Adjust gross based on the difference
    const adjustment = (netSalary - calculatedNet) / (1 - (tax / gross));
    gross += adjustment;

    // Prevent negative gross
    if (gross < 0) gross = netSalary;

    iterations++;
  }

  return gross;
}

// Country-specific tax calculation function
function calculateCountryTax(annualGross: number, country: string): number {
  // Simplified tax calculations - in a real app, these would be more comprehensive
  switch (country) {
    case 'US':
      // Use the detailed US calculation
      return calculateFederalTax2025(annualGross - 13850, 'single') + calculateStateTax2025(annualGross, 'CA') + (annualGross * 0.0765);

    case 'UK':
      // UK income tax (2024/25)
      const personalAllowance = 12570;
      const basicRateLimit = 50270;
      const higherRateLimit = 125140;

      const taxable = Math.max(0, annualGross - personalAllowance);
      if (taxable <= (basicRateLimit - personalAllowance)) return taxable * 0.20;
      if (taxable <= (higherRateLimit - personalAllowance)) {
        return (basicRateLimit - personalAllowance) * 0.20 + (taxable - (basicRateLimit - personalAllowance)) * 0.40;
      }
      return (basicRateLimit - personalAllowance) * 0.20 + (higherRateLimit - basicRateLimit) * 0.40 +
             (taxable - (higherRateLimit - personalAllowance)) * 0.45;

    case 'CA':
      // Canadian federal tax (simplified)
      if (annualGross <= 142292) return annualGross * 0.15;
      if (annualGross <= 170751) return 21343.80 + (annualGross - 142292) * 0.20;
      if (annualGross <= 227091) return 21343.80 + 5719.20 + (annualGross - 170751) * 0.24;
      return 21343.80 + 5719.20 + 13567.92 + (annualGross - 227091) * 0.29;

    case 'AU':
      // Australian tax (simplified)
      if (annualGross <= 18200) return 0;
      if (annualGross <= 45000) return (annualGross - 18200) * 0.19;
      if (annualGross <= 120000) return 5092 + (annualGross - 45000) * 0.325;
      if (annualGross <= 180000) return 29467 + (annualGross - 120000) * 0.37;
      return 51667 + (annualGross - 180000) * 0.45;

    case 'DE':
      // German tax (simplified progressive)
      if (annualGross <= 10908) return 0;
      if (annualGross <= 62809) return (annualGross - 10908) * 0.14;
      if (annualGross <= 277825) return 1414.07 + (annualGross - 62809) * 0.24;
      return 1414.07 + 42844.76 + (annualGross - 277825) * 0.42;

    case 'FR':
      // French tax (simplified)
      if (annualGross <= 11294) return 0;
      if (annualGross <= 28797) return (annualGross - 11294) * 0.11;
      if (annualGross <= 82341) return 1930.19 + (annualGross - 28797) * 0.30;
      if (annualGross <= 177106) return 1930.19 + 16064.44 + (annualGross - 82341) * 0.41;
      return 1930.19 + 16064.44 + 38871.15 + (annualGross - 177106) * 0.45;

    case 'IE':
      // Ireland tax calculation using the detailed functions
      const prsi = annualGross * 0.04; // PRSI is 4% of gross salary
      return calculateIrelandPAYE(annualGross) + calculateIrelandUSC(annualGross) + prsi;

    case 'IN':
      // Indian tax (old regime simplified)
      if (annualGross <= 250000) return 0;
      if (annualGross <= 500000) return (annualGross - 250000) * 0.05;
      if (annualGross <= 1000000) return 12500 + (annualGross - 500000) * 0.20;
      return 12500 + 100000 + (annualGross - 1000000) * 0.30;

    case 'JP':
      // Japanese tax (simplified progressive)
      if (annualGross <= 1950000) return annualGross * 0.05;
      if (annualGross <= 3300000) return 97500 + (annualGross - 1950000) * 0.10;
      if (annualGross <= 6950000) return 97500 + 135000 + (annualGross - 3300000) * 0.20;
      if (annualGross <= 9000000) return 97500 + 135000 + 730000 + (annualGross - 6950000) * 0.23;
      if (annualGross <= 18000000) return 97500 + 135000 + 730000 + 469000 + (annualGross - 9000000) * 0.33;
      return 97500 + 135000 + 730000 + 469000 + 2970000 + (annualGross - 18000000) * 0.40;

    case 'SG':
      // Singapore tax (simplified)
      if (annualGross <= 20000) return 0;
      if (annualGross <= 30000) return (annualGross - 20000) * 0.02;
      if (annualGross <= 40000) return 200 + (annualGross - 30000) * 0.035;
      if (annualGross <= 80000) return 200 + 350 + (annualGross - 40000) * 0.07;
      if (annualGross <= 120000) return 200 + 350 + 2800 + (annualGross - 80000) * 0.115;
      if (annualGross <= 160000) return 200 + 350 + 2800 + 4600 + (annualGross - 120000) * 0.15;
      if (annualGross <= 200000) return 200 + 350 + 2800 + 4600 + 6000 + (annualGross - 160000) * 0.18;
      if (annualGross <= 240000) return 200 + 350 + 2800 + 4600 + 6000 + 7200 + (annualGross - 200000) * 0.19;
      if (annualGross <= 280000) return 200 + 350 + 2800 + 4600 + 6000 + 7200 + 7600 + (annualGross - 240000) * 0.195;
      if (annualGross <= 320000) return 200 + 350 + 2800 + 4600 + 6000 + 7200 + 7600 + 7600 + (annualGross - 280000) * 0.20;
      return 200 + 350 + 2800 + 4600 + 6000 + 7200 + 7600 + 7600 + 8000 + (annualGross - 320000) * 0.22;

    case 'AE':
      // UAE tax (0% on personal income)
      return 0;

    default:
      // Default to 25% for unknown countries
      return annualGross * 0.25;
  }
}

// Ireland Salary Calculator specific functions
function calculateIrelandPAYE(grossIncome: number): number {
  const entryRateLimit = 42000; // 20% rate up to €42,000
  const middleRateLimit = 70044; // 40% rate from €42,001 to €70,044
  // 48% rate above €70,044

  let incomeTax = 0;

  if (grossIncome <= entryRateLimit) {
    incomeTax = grossIncome * 0.20;
  } else if (grossIncome <= middleRateLimit) {
    incomeTax = (entryRateLimit * 0.20) + ((grossIncome - entryRateLimit) * 0.40);
  } else {
    incomeTax = (entryRateLimit * 0.20) +
                ((middleRateLimit - entryRateLimit) * 0.40) +
                ((grossIncome - middleRateLimit) * 0.48);
  }

  return incomeTax;
}

// UK Tax Calculations (2026 rates)
function calculateUKPAYE(grossIncome: number): number {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 150000;

  let incomeTax = 0;
  const taxableIncome = grossIncome - personalAllowance;

  if (taxableIncome <= 0) {
    return 0;
  }

  if (taxableIncome <= (basicRateLimit - personalAllowance)) {
    incomeTax = taxableIncome * 0.20;
  } else if (taxableIncome <= (higherRateLimit - personalAllowance)) {
    incomeTax = ((basicRateLimit - personalAllowance) * 0.20) +
                ((taxableIncome - (basicRateLimit - personalAllowance)) * 0.40);
  } else {
    incomeTax = ((basicRateLimit - personalAllowance) * 0.20) +
                ((higherRateLimit - basicRateLimit) * 0.40) +
                ((taxableIncome - (higherRateLimit - personalAllowance)) * 0.45);
  }

  return incomeTax;
}

function calculateUKNIC(grossIncome: number): number {
  const primaryThreshold = 12570;
  const upperEarningsLimit = 50270;

  let nic = 0;

  if (grossIncome <= primaryThreshold) {
    return 0;
  }

  if (grossIncome <= upperEarningsLimit) {
    nic = (grossIncome - primaryThreshold) * 0.08;
  } else {
    nic = (upperEarningsLimit - primaryThreshold) * 0.08 +
          (grossIncome - upperEarningsLimit) * 0.02;
  }

  return nic;
}

function calculateUKStudentLoan(grossIncome: number, plan: string): number {
  let threshold = 0;
  let rate = 0;

  switch (plan) {
    case 'Plan 1':
      threshold = 22015;
      rate = 0.09;
      break;
    case 'Plan 2':
      threshold = 27295;
      rate = 0.09;
      break;
    case 'Plan 4':
      threshold = 27660;
      rate = 0.09;
      break;
    case 'Plan 5':
      threshold = 24990;
      rate = 0.09;
      break;
    default:
      return 0;
  }

  if (grossIncome <= threshold) {
    return 0;
  }

  return (grossIncome - threshold) * rate;
}

// USA Tax Calculations (2026 rates)
function calculateUSAFederalTax(grossIncome: number): number {
  const brackets = [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ];

  let tax = 0;
  for (const bracket of brackets) {
    if (grossIncome > bracket.min) {
      const taxableInBracket = Math.min(grossIncome, bracket.max) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }
  return tax;
}

function calculateUSAStateTax(grossIncome: number, state: string): number {
  const stateRates: Record<string, number> = {
    'AL': 0.05, 'AK': 0.00, 'AZ': 0.0259, 'AR': 0.049, 'CA': 0.0955,
    'CO': 0.044, 'CT': 0.0495, 'DE': 0.048, 'FL': 0.00, 'GA': 0.0499,
    'HI': 0.0725, 'ID': 0.0483, 'IL': 0.0495, 'IN': 0.0315, 'IA': 0.0482,
    'KS': 0.045, 'KY': 0.048, 'LA': 0.0425, 'ME': 0.058, 'MD': 0.0475,
    'MA': 0.05, 'MI': 0.0425, 'MN': 0.0525, 'MS': 0.05, 'MO': 0.04,
    'MT': 0.041, 'NE': 0.0425, 'NV': 0.00, 'NH': 0.04, 'NJ': 0.0553,
    'NM': 0.049, 'NY': 0.04, 'NC': 0.0475, 'ND': 0.029, 'OH': 0.0399,
    'OK': 0.0475, 'OR': 0.0475, 'PA': 0.0307, 'RI': 0.0499, 'SC': 0.03,
    'SD': 0.00, 'TN': 0.00, 'TX': 0.00, 'UT': 0.0495, 'VT': 0.0359,
    'VA': 0.0575, 'WA': 0.00, 'WV': 0.0472, 'WI': 0.035, 'WY': 0.00
  };

  const rate = stateRates[state] || 0;
  return grossIncome * rate;
}

// Safe evaluation of mathematical expressions
function safeEval(expression: string, variables: Record<string, number | string>): number {
  try {
    // Create a safe evaluation context with tax calculation functions
    const context = {
      ...variables,
      Math,
      // Tax calculation functions
      calculateFederalTax2025,
      calculateStateTax2025,
      calculateUKTax2025,
      calculateUKNI2025,
      calculateIrelandIncomeTax,
      calculateIrelandUSC,
      calculateIrelandPAYE,
      calculateUKPAYE,
      calculateUKNIC,
      calculateUKStudentLoan,
      calculateUSAFederalTax,
      calculateUSAStateTax,
      calculateAustraliaIncomeTax,
      calculateAustraliaMedicareLevy,
      calculateSpainIncomeTax,
      calculateNetherlandsIncomeTax,
      calculateFranceIncomeTax,
      calculateGermanyIncomeTax,
      calculateCanadaFederalTax,
      calculateCanadaProvincialTax,
      calculateCountryTax
    };

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
  inputValues: Record<string, number | string | boolean>
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
    } else if (typeof value === 'boolean') {
      // Convert booleans to numbers (1 for true, 0 for false)
      allVariables[key] = value ? 1 : 0;
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

// Get currency symbol for country
export function getCurrencySymbol(country: string): string {
  const currencyMap: Record<string, string> = {
    'US': '$',
    'UK': '£',
    'CA': 'CAD',
    'AU': 'AUD',
    'DE': '€',
    'FR': '€',
    'IN': '₹',
    'JP': '¥',
    'SG': 'SGD',
    'AE': 'AED'
  };
  return currencyMap[country] || '$';
}

// Format currency values
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

// Format currency with country
export function formatCurrencyByCountry(amount: number, country: string): string {
  const symbol = getCurrencySymbol(country);
  return formatCurrency(amount, symbol);
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Get default values for a calculator
export function getCalculatorDefaults(calculatorId: string): Record<string, number | string | boolean> {
  const calculator = getCalculator(calculatorId);
  if (!calculator) return {};

  const defaults: Record<string, number | string | boolean> = {};
  calculator.inputs.forEach(input => {
    defaults[input.id] = input.default;
  });

  return defaults;
}

// Validate calculator inputs
export function validateCalculatorInputs(
  calculatorId: string,
  values: Record<string, number | string | boolean>
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
