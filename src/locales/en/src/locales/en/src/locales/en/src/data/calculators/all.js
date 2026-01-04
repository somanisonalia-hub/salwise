// All calculator data exports in one file
export const irelandHourlyToSalary = {
  "id": "irelandHourlyToSalary",
  "name": "Ireland Hourly to Salary Calculator",
  "description": "Convert hourly pay to annual salary in Ireland with tax calculations",
  "inputs": [
    {
      "id": "hourlyRate",
      "label": "Hourly Rate",
      "type": "number",
      "default": 20,
      "unit": "€",
      "required": true,
      "min": 0,
      "max": 500,
      "description": "Your hourly pay rate in euros"
    },
    {
      "id": "hoursPerWeek",
      "label": "Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "required": true,
      "min": 1,
      "max": 80,
      "description": "Number of hours worked per week"
    }
  ],
  "outputs": [
    {
      "id": "grossAnnual",
      "label": "Gross Annual Salary",
      "formula": "hourlyRate * hoursPerWeek * 52",
      "unit": "€"
    },
    {
      "id": "grossMonthly",
      "label": "Gross Monthly Salary", 
      "formula": "(hourlyRate * hoursPerWeek * 52) / 12",
      "unit": "€"
    },
    {
      "id": "grossWeekly",
      "label": "Gross Weekly Salary",
      "formula": "hourlyRate * hoursPerWeek",
      "unit": "€"
    },
    {
      "id": "payeTax",
      "label": "PAYE Tax",
      "formula": "calculateIrelandPAYE(grossAnnual)",
      "unit": "€"
    },
    {
      "id": "usc",
      "label": "USC",
      "formula": "calculateIrelandUSC(grossAnnual)",
      "unit": "€"
    },
    {
      "id": "prsi",
      "label": "PRSI",
      "formula": "calculateIrelandPRSI(grossAnnual)",
      "unit": "€"
    },
    {
      "id": "totalDeductions",
      "label": "Total Deductions",
      "formula": "payeTax + usc + prsi",
      "unit": "€"
    },
    {
      "id": "netAnnual",
      "label": "Net Annual Salary",
      "formula": "grossAnnual - totalDeductions",
      "unit": "€"
    },
    {
      "id": "netMonthly",
      "label": "Net Monthly Salary",
      "formula": "netAnnual / 12",
      "unit": "€"
    },
    {
      "id": "netWeekly",
      "label": "Net Weekly Salary",
      "formula": "netAnnual / 52",
      "unit": "€"
    },
    {
      "id": "effectiveTaxRate",
      "label": "Effective Tax Rate",
      "formula": "grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0",
      "unit": "%"
    }
  ],
  "examples": [
    {
      "scenario": "€20/hour full-time retail worker",
      "inputs": {"hourlyRate": 20, "hoursPerWeek": 40},
      "expectedOutputs": {
        "grossAnnual": 41600,
        "payeTax": 4232,
        "usc": 1040,
        "prsi": 1664,
        "totalDeductions": 6936,
        "netAnnual": 34664
      }
    },
    {
      "scenario": "€30/hour professional, 35 hours/week",
      "inputs": {"hourlyRate": 30, "hoursPerWeek": 35},
      "expectedOutputs": {
        "grossAnnual": 54600,
        "payeTax": 8282,
        "usc": 1872,
        "prsi": 2184,
        "totalDeductions": 12338,
        "netAnnual": 42262
      }
    }
  ]
};

export const irelandOvertimePay = {
  "id": "irelandOvertimePay",
  "name": "Ireland Overtime Pay Calculator",
  "description": "Calculate overtime pay in Ireland with tax deductions",
  "inputs": [
    {
      "id": "baseHourlyRate",
      "label": "Base Hourly Rate",
      "type": "number",
      "default": 25,
      "unit": "€",
      "required": true,
      "min": 0,
      "max": 500,
      "description": "Your regular hourly pay rate"
    },
    {
      "id": "overtimeHoursPerWeek",
      "label": "Overtime Hours per Week",
      "type": "number",
      "default": 5,
      "unit": "hours",
      "required": true,
      "min": 0,
      "max": 40,
      "description": "Number of overtime hours worked per week"
    },
    {
      "id": "overtimeMultiplier",
      "label": "Overtime Multiplier",
      "type": "number",
      "default": 1.5,
      "unit": "x",
      "required": true,
      "min": 1,
      "max": 3,
      "step": 0.1,
      "description": "Time-and-a-half = 1.5, Double time = 2.0"
    }
  ],
  "outputs": [
    {
      "id": "overtimeHourlyRate",
      "label": "Overtime Hourly Rate",
      "formula": "baseHourlyRate * overtimeMultiplier",
      "unit": "€"
    },
    {
      "id": "grossOvertimeWeekly",
      "label": "Gross Overtime Pay (Weekly)",
      "formula": "baseHourlyRate * overtimeMultiplier * overtimeHoursPerWeek",
      "unit": "€"
    },
    {
      "id": "grossOvertimeAnnual",
      "label": "Gross Overtime Pay (Annual)",
      "formula": "grossOvertimeWeekly * 52",
      "unit": "€"
    },
    {
      "id": "taxOnOvertime",
      "label": "Tax on Overtime",
      "formula": "calculateIrelandPAYE(grossOvertimeAnnual) + calculateIrelandUSC(grossOvertimeAnnual) + calculateIrelandPRSI(grossOvertimeAnnual)",
      "unit": "€"
    },
    {
      "id": "netOvertimeWeekly",
      "label": "Net Overtime Pay (Weekly)",
      "formula": "grossOvertimeWeekly - (taxOnOvertime / 52)",
      "unit": "€"
    },
    {
      "id": "netOvertimeAnnual",
      "label": "Net Overtime Pay (Annual)",
      "formula": "grossOvertimeAnnual - taxOnOvertime",
      "unit": "€"
    },
    {
      "id": "effectiveOvertimeTaxRate",
      "label": "Effective Overtime Tax Rate",
      "formula": "grossOvertimeAnnual > 0 ? (taxOnOvertime / grossOvertimeAnnual) * 100 : 0",
      "unit": "%"
    }
  ],
  "examples": [
    {
      "scenario": "€25/hour base, 5 hours OT/week at time-and-a-half",
      "inputs": {"baseHourlyRate": 25, "overtimeHoursPerWeek": 5, "overtimeMultiplier": 1.5},
      "expectedOutputs": {
        "overtimeHourlyRate": 37.5,
        "grossOvertimeWeekly": 187.5,
        "grossOvertimeAnnual": 9750,
        "taxOnOvertime": 1988,
        "netOvertimeWeekly": 154.69,
        "netOvertimeAnnual": 7762
      }
    },
    {
      "scenario": "€30/hour base, 10 hours OT/week at double time",
      "inputs": {"baseHourlyRate": 30, "overtimeHoursPerWeek": 10, "overtimeMultiplier": 2.0},
      "expectedOutputs": {
        "overtimeHourlyRate": 60,
        "grossOvertimeWeekly": 600,
        "grossOvertimeAnnual": 31200,
        "taxOnOvertime": 8082,
        "netOvertimeWeekly": 461.54,
        "netOvertimeAnnual": 23118
      }
    }
  ]
};

export const irelandBonusTax = {
  "id": "irelandBonusTax",
  "name": "Ireland Bonus Tax Calculator",
  "description": "Calculate bonus tax in Ireland with PAYE, PRSI, and USC deductions",
  "inputs": [
    {
      "id": "baseSalary",
      "label": "Base Annual Salary",
      "type": "number",
      "default": 50000,
      "unit": "€",
      "required": true,
      "min": 0,
      "max": 1000000,
      "description": "Your regular annual salary before bonus"
    },
    {
      "id": "bonusPercentage",
      "label": "Bonus Percentage",
      "type": "number",
      "default": 5,
      "unit": "%",
      "required": false,
      "min": 0,
      "max": 100,
      "description": "Bonus as percentage of base salary (optional)"
    },
    {
      "id": "bonusAmount",
      "label": "Bonus Amount",
      "type": "number",
      "default": 0,
      "unit": "€",
      "required": false,
      "min": 0,
      "max": 1000000,
      "description": "Fixed bonus amount (alternative to percentage)"
    }
  ],
  "outputs": [
    {
      "id": "calculatedBonusAmount",
      "label": "Bonus Amount",
      "formula": "bonusAmount > 0 ? bonusAmount : (baseSalary * bonusPercentage / 100)",
      "unit": "€"
    },
    {
      "id": "totalIncome",
      "label": "Total Income (Base + Bonus)",
      "formula": "baseSalary + calculatedBonusAmount",
      "unit": "€"
    },
    {
      "id": "taxOnTotalIncome",
      "label": "Tax on Total Income",
      "formula": "calculateIrelandPAYE(totalIncome) + calculateIrelandUSC(totalIncome) + calculateIrelandPRSI(totalIncome)",
      "unit": "€"
    },
    {
      "id": "taxOnBaseSalary",
      "label": "Tax on Base Salary",
      "formula": "calculateIrelandPAYE(baseSalary) + calculateIrelandUSC(baseSalary) + calculateIrelandPRSI(baseSalary)",
      "unit": "€"
    },
    {
      "id": "taxOnBonus",
      "label": "Tax on Bonus",
      "formula": "taxOnTotalIncome - taxOnBaseSalary",
      "unit": "€"
    },
    {
      "id": "netBonus",
      "label": "Net Bonus Amount",
      "formula": "calculatedBonusAmount - taxOnBonus",
      "unit": "€"
    },
    {
      "id": "effectiveBonusTaxRate",
      "label": "Effective Bonus Tax Rate",
      "formula": "calculatedBonusAmount > 0 ? (taxOnBonus / calculatedBonusAmount) * 100 : 0",
      "unit": "%"
    }
  ],
  "examples": [
    {
      "scenario": "€50,000 base salary with 5% bonus",
      "inputs": {"baseSalary": 50000, "bonusPercentage": 5, "bonusAmount": 0},
      "expectedOutputs": {
        "calculatedBonusAmount": 2500,
        "totalIncome": 52500,
        "taxOnBonus": 513,
        "netBonus": 1987,
        "effectiveBonusTaxRate": 20.5
      }
    },
    {
      "scenario": "€70,000 base salary with 10% bonus",
      "inputs": {"baseSalary": 70000, "bonusPercentage": 10, "bonusAmount": 0},
      "expectedOutputs": {
        "calculatedBonusAmount": 7000,
        "totalIncome": 77000,
        "taxOnBonus": 2113,
        "netBonus": 4887,
        "effectiveBonusTaxRate": 30.2
      }
    }
  ]
};

export const irelandContractorSalary = {
  "id": "irelandContractorSalary",
  "name": "Ireland Contractor Salary Calculator",
  "description": "Compare Ltd vs umbrella company options for Irish contractors",
  "inputs": [
    {
      "id": "dailyRate",
      "label": "Daily Rate",
      "type": "number",
      "default": 400,
      "unit": "€",
      "required": true,
      "min": 0,
      "max": 2000,
      "description": "Your daily contracting rate"
    },
    {
      "id": "daysPerMonth",
      "label": "Working Days per Month",
      "type": "number",
      "default": 20,
      "unit": "days",
      "required": true,
      "min": 1,
      "max": 31,
      "description": "Number of working days per month"
    },
    {
      "id": "expenses",
      "label": "Monthly Expenses",
      "type": "number",
      "default": 0,
      "unit": "€",
      "required": false,
      "min": 0,
      "max": 50000,
      "description": "Legitimate business expenses (optional)"
    }
  ],
  "outputs": [
    {
      "id": "grossMonthly",
      "label": "Gross Monthly Income",
      "formula": "dailyRate * daysPerMonth",
      "unit": "€"
    },
    {
      "id": "grossAnnual",
      "label": "Gross Annual Income",
      "formula": "grossMonthly * 12",
      "unit": "€"
    },
    {
      "id": "ltdCorporationTax",
      "label": "Ltd Corporation Tax (25%)",
      "formula": "Math.max(0, grossAnnual - expenses * 12) * 0.25",
      "unit": "€"
    },
    {
      "id": "ltdDirectorsSalary",
      "label": "Ltd Director's Salary",
      "formula": "Math.min(grossAnnual * 0.3, 50000)",
      "unit": "€"
    },
    {
      "id": "ltdSalaryTax",
      "label": "Ltd Salary Tax",
      "formula": "calculateIrelandPAYE(ltdDirectorsSalary) + calculateIrelandUSC(ltdDirectorsSalary) + calculateIrelandPRSI(ltdDirectorsSalary)",
      "unit": "€"
    },
    {
      "id": "ltdProfitsAfterTax",
      "label": "Ltd Profits After Corporation Tax",
      "formula": "Math.max(0, grossAnnual - expenses * 12 - ltdDirectorsSalary - ltdCorporationTax)",
      "unit": "€"
    },
    {
      "id": "ltdDividendTax",
      "label": "Ltd Dividend Tax (25%)",
      "formula": "ltdProfitsAfterTax * 0.25",
      "unit": "€"
    },
    {
      "id": "ltdNetMonthly",
      "label": "Ltd Net Monthly Income",
      "formula": "(ltdDirectorsSalary - ltdSalaryTax + (ltdProfitsAfterTax - ltdDividendTax)) / 12",
      "unit": "€"
    },
    {
      "id": "umbrellaMargin",
      "label": "Umbrella Company Margin (6%)",
      "formula": "grossMonthly * 0.06",
      "unit": "€"
    },
    {
      "id": "umbrellaTaxableIncome",
      "label": "Umbrella Taxable Income",
      "formula": "grossMonthly - umbrellaMargin - expenses",
      "unit": "€"
    },
    {
      "id": "umbrellaTax",
      "label": "Umbrella Tax (PAYE + PRSI + USC)",
      "formula": "calculateIrelandPAYE(umbrellaTaxableIncome * 12) / 12 + calculateIrelandUSC(umbrellaTaxableIncome * 12) / 12 + calculateIrelandPRSI(umbrellaTaxableIncome * 12) / 12",
      "unit": "€"
    },
    {
      "id": "umbrellaNetMonthly",
      "label": "Umbrella Net Monthly Income",
      "formula": "umbrellaTaxableIncome - umbrellaTax",
      "unit": "€"
    },
    {
      "id": "ltdVsUmbrella",
      "label": "Ltd vs Umbrella Difference",
      "formula": "ltdNetMonthly - umbrellaNetMonthly",
      "unit": "€"
    }
  ],
  "examples": [
    {
      "scenario": "€400/day, 20 days/month contractor",
      "inputs": {"dailyRate": 400, "daysPerMonth": 20, "expenses": 0},
      "expectedOutputs": {
        "grossMonthly": 8000,
        "ltdNetMonthly": 5920,
        "umbrellaNetMonthly": 5680,
        "ltdVsUmbrella": 240
      }
    },
    {
      "scenario": "€550/day, 15 days/month senior contractor",
      "inputs": {"dailyRate": 550, "daysPerMonth": 15, "expenses": 200},
      "expectedOutputs": {
        "grossMonthly": 8250,
        "ltdNetMonthly": 6088,
        "umbrellaNetMonthly": 5773,
        "ltdVsUmbrella": 315
      }
    }
  ]
};
