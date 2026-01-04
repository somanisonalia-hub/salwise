const usaContractorSalary = {
  "id": "usaContractorSalary",
  "name": "USA Contractor Salary Calculator",
  "description": "Calculate contractor salary including self-employment tax in the USA",
  "inputs": [
    {
      "id": "dailyRate",
      "label": "Daily Rate ($)",
      "type": "number",
      "default": 500,
      "unit": "$"
    },
    {
      "id": "daysPerMonth",
      "label": "Working Days per Month",
      "type": "number",
      "default": 20,
      "unit": "days",
      "min": 1,
      "max": 25
    },
    {
      "id": "state",
      "label": "State",
      "type": "select",
      "options": [
        {"value": "CA", "label": "California"},
        {"value": "NY", "label": "New York"},
        {"value": "TX", "label": "Texas"}
      ],
      "default": "CA"
    },
    {
      "id": "expensesPerDay",
      "label": "Daily Business Expenses ($)",
      "type": "number",
      "default": 0,
      "unit": "$",
      "optional": true,
      "min": 0
    },
    {
      "id": "fourOOneKPercent",
      "label": "Self-Employed 401(k) (%)",
      "type": "number",
      "default": 0,
      "unit": "%",
      "min": 0,
      "max": 25,
      "optional": true
    },
    {
      "id": "monthsPerYear",
      "label": "Months Worked per Year",
      "type": "number",
      "default": 12,
      "unit": "months",
      "min": 1,
      "max": 12
    }
  ],
  "formula": {
    "grossAnnual": "dailyRate * daysPerMonth * monthsPerYear",
    "annualExpenses": "expensesPerDay * daysPerMonth * monthsPerYear",
    "taxableIncome": "grossAnnual - annualExpenses",
    "fourOOneKContribution": "taxableIncome * fourOOneKPercent / 100",
    "adjustedTaxableIncome": "taxableIncome - fourOOneKContribution",
    "selfEmploymentTax": "Math.min(adjustedTaxableIncome * 0.153, 160200 * 0.153)",
    "federalTax": "calculateUSAFederalTax(adjustedTaxableIncome)",
    "stateTax": "calculateUSAStateTax(adjustedTaxableIncome, state)",
    "totalTax": "selfEmploymentTax + federalTax + stateTax",
    "netAnnual": "adjustedTaxableIncome - totalTax",
    "netMonthly": "netAnnual / 12",
    "quarterlyPayment": "totalTax / 4",
    "effectiveTaxRate": "grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "$500/day, 20 days/month in California",
      "inputs": {"dailyRate": 500, "daysPerMonth": 20, "state": "CA", "expensesPerDay": 0, "fourOOneKPercent": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 120000,
        "selfEmploymentTax": 18360,
        "federalTax": 20790,
        "stateTax": 11400,
        "totalTax": 50550,
        "netAnnual": 69450
      }
    },
    {
      "scenario": "$650/day, 15 days/month with $200/day expenses in New York",
      "inputs": {"dailyRate": 650, "daysPerMonth": 15, "state": "NY", "expensesPerDay": 200, "fourOOneKPercent": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 117000,
        "annualExpenses": 72000,
        "taxableIncome": 45000,
        "selfEmploymentTax": 6885,
        "federalTax": 6890,
        "stateTax": 1800,
        "totalTax": 15575,
        "netAnnual": 29425
      }
    }
  ]
};

export default usaContractorSalary;
