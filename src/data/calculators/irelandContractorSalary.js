const irelandContractorSalary = {
  "id": "irelandContractorSalary",
  "name": "Ireland Contractor Salary Calculator",
  "description": "Calculate contractor salary comparing Ltd company vs umbrella company structures",
  "inputs": [
    {
      "id": "dailyRate",
      "label": "Daily Rate (EUR)",
      "type": "number",
      "default": 400,
      "unit": "€"
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
      "id": "structure",
      "label": "Contractor Structure",
      "type": "select",
      "options": ["Ltd Company", "Umbrella Company"],
      "default": "Ltd Company"
    },
    {
      "id": "expensesPerDay",
      "label": "Daily Expenses (EUR)",
      "type": "number",
      "default": 0,
      "unit": "€",
      "optional": true,
      "min": 0
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
    "corporationTax": "structure === 'Ltd Company' ? taxableIncome * 0.125 : 0",
    "directorsSalary": "structure === 'Ltd Company' ? Math.min(taxableIncome * 0.4, 50000) : 0",
    "dividends": "structure === 'Ltd Company' ? Math.max(0, taxableIncome - corporationTax - directorsSalary) : 0",
    "payeTax": "structure === 'Ltd Company' ? calculateIrelandPAYE(directorsSalary) : structure === 'Umbrella Company' ? calculateIrelandPAYE(taxableIncome) : 0",
    "usc": "structure === 'Ltd Company' ? calculateIrelandUSC(directorsSalary) : structure === 'Umbrella Company' ? calculateIrelandUSC(taxableIncome) : 0",
    "prsi": "structure === 'Ltd Company' ? calculateIrelandPRSI(directorsSalary) : structure === 'Umbrella Company' ? calculateIrelandPRSI(taxableIncome) : 0",
    "dividendTax": "structure === 'Ltd Company' ? dividends * 0.20 : 0",
    "totalTax": "corporationTax + payeTax + usc + prsi + dividendTax",
    "netAnnual": "taxableIncome - totalTax",
    "netMonthly": "netAnnual / 12",
    "effectiveTaxRate": "grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "€400/day Ltd Company, 20 days/month",
      "inputs": {"dailyRate": 400, "daysPerMonth": 20, "structure": "Ltd Company", "expensesPerDay": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 96000,
        "corporationTax": 12000,
        "directorsSalary": 30000,
        "dividends": 54000,
        "payeTax": 4667,
        "usc": 1725,
        "prsi": 1200,
        "dividendTax": 10800,
        "totalTax": 29392,
        "netAnnual": 66608
      }
    },
    {
      "scenario": "€550/day Umbrella, 15 days/month",
      "inputs": {"dailyRate": 550, "daysPerMonth": 15, "structure": "Umbrella Company", "expensesPerDay": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 99000,
        "corporationTax": 0,
        "directorsSalary": 0,
        "dividends": 0,
        "payeTax": 27467,
        "usc": 4950,
        "prsi": 3960,
        "dividendTax": 0,
        "totalTax": 36377,
        "netAnnual": 62623
      }
    }
  ]
};

export default irelandContractorSalary;
