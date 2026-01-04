const irelandSalaryCalculator = {
  "id": "irelandSalaryCalculator",
  "name": "Ireland Salary Calculator",
  "description": "Calculate take-home pay in Ireland including PAYE, USC, PRSI, and deductions",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Gross Annual Salary",
      "type": "number",
      "default": 50000,
      "unit": "€",
      "placeholder": "50000",
      "required": true,
      "min": 0,
      "max": 1000000,
      "description": "Your annual gross salary before taxes and deductions"
    },
    {
      "id": "payFrequency",
      "label": "Pay Frequency",
      "type": "select",
      "default": "annual",
      "options": [
        { "value": "annual", "label": "Annual" },
        { "value": "monthly", "label": "Monthly" },
        { "value": "weekly", "label": "Weekly" },
        { "value": "hourly", "label": "Hourly" }
      ],
      "required": true,
      "description": "How often you get paid"
    },
    {
      "id": "bonus",
      "label": "Annual Bonus",
      "type": "number",
      "default": 0,
      "unit": "€",
      "placeholder": "0",
      "required": false,
      "min": 0,
      "max": 500000,
      "description": "Annual bonus amount (optional)"
    },
    {
      "id": "pensionContribution",
      "label": "Pension Contribution (%)",
      "type": "number",
      "default": 0,
      "unit": "%",
      "placeholder": "5",
      "required": false,
      "min": 0,
      "max": 20,
      "description": "Percentage of salary contributed to pension"
    }
  ],
  "outputs": [
    {
      "id": "netAnnual",
      "label": "Net Annual Take-Home Pay",
      "unit": "currency",
      "description": "Your take-home pay after all taxes and deductions"
    },
    {
      "id": "netMonthly",
      "label": "Monthly Take-Home Pay",
      "unit": "currency",
      "description": "Monthly take-home pay"
    },
    {
      "id": "incomeTax",
      "label": "PAYE Income Tax",
      "unit": "currency",
      "description": "Irish income tax based on progressive brackets"
    },
    {
      "id": "usc",
      "label": "Universal Social Charge (USC)",
      "unit": "currency",
      "description": "Universal Social Charge for social welfare"
    },
    {
      "id": "prsi",
      "label": "Pay Related Social Insurance (PRSI)",
      "unit": "currency",
      "description": "4% PRSI for social insurance benefits"
    },
    {
      "id": "pension",
      "label": "Pension Contribution",
      "unit": "currency",
      "description": "Your pension contribution"
    },
    {
      "id": "totalDeductions",
      "label": "Total Deductions",
      "unit": "currency",
      "description": "All taxes and deductions combined"
    },
    {
      "id": "effectiveTaxRate",
      "label": "Effective Tax Rate",
      "unit": "%",
      "description": "Overall tax rate on your income"
    }
  ],
  "formula": {
    "grossAnnual": "payFrequency === 'annual' ? grossSalary : payFrequency === 'monthly' ? grossSalary * 12 : payFrequency === 'weekly' ? grossSalary * 52 : grossSalary * 40 * 52",
    "hourlyRate": "payFrequency === 'annual' ? grossSalary / (40 * 52) : payFrequency === 'monthly' ? grossSalary / (40 * 4.33) : payFrequency === 'weekly' ? grossSalary / 40 : grossSalary",
    "overtimePay": "overtimeHours * hourlyRate * overtimeRate",
    "totalGross": "grossAnnual + bonus + overtimePay",
    "incomeTax": "calculateIrelandPAYE(totalGross)",
    "usc": "calculateIrelandUSC(totalGross)",
    "prsi": "totalGross * 0.04",
    "pension": "grossAnnual * (pensionPercent / 100)",
    "totalDeductions": "incomeTax + usc + prsi + pension",
    "netAnnual": "totalGross - totalDeductions",
    "netMonthly": "netAnnual / 12",
    "effectiveTaxRate": "totalGross > 0 ? ((incomeTax + usc + prsi) / totalGross) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "€50,000 in Ireland",
      "inputs": {"grossSalary": 50000, "payFrequency": "annual", "bonus": 5000, "pensionPercent": 0},
      "expectedOutputs": {
        "totalGross": 55000,
        "incomeTax": 9500,
        "usc": 2750,
        "prsi": 2200,
        "pension": 0,
        "totalDeductions": 14450,
        "netAnnual": 40550
      }
    }
  ]
};

export default irelandSalaryCalculator;
