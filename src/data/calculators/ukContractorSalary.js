const ukContractorSalary = {
  "id": "ukContractorSalary",
  "name": "UK Contractor Salary Calculator",
  "description": "Calculate contractor salary comparing Ltd company vs umbrella company structures",
  "inputs": [
    {
      "id": "dailyRate",
      "label": "Daily Rate (£)",
      "type": "number",
      "default": 350,
      "unit": "£"
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
      "label": "Daily Expenses (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
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
    "corporationTax": "structure === 'Ltd Company' ? taxableIncome * 0.25 : 0",
    "directorsSalary": "structure === 'Ltd Company' ? Math.min(taxableIncome * 0.4, 50000) : 0",
    "dividends": "structure === 'Ltd Company' ? Math.max(0, taxableIncome - corporationTax - directorsSalary) : 0",
    "payeTax": "structure === 'Ltd Company' ? calculateUKPAYE(directorsSalary) : structure === 'Umbrella Company' ? calculateUKPAYE(taxableIncome) : 0",
    "nic": "structure === 'Ltd Company' ? calculateUKNIC(directorsSalary) : structure === 'Umbrella Company' ? calculateUKNIC(taxableIncome) : 0",
    "dividendTax": "structure === 'Ltd Company' ? dividends * 0.0875 : 0",
    "totalTax": "corporationTax + payeTax + nic + dividendTax",
    "netAnnual": "taxableIncome - totalTax",
    "netMonthly": "netAnnual / 12",
    "effectiveTaxRate": "grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "£350/day Ltd Company, 20 days/month",
      "inputs": {"dailyRate": 350, "daysPerMonth": 20, "structure": "Ltd Company", "expensesPerDay": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 84000,
        "corporationTax": 21000,
        "directorsSalary": 30000,
        "dividends": 33000,
        "payeTax": 4454,
        "nic": 1754,
        "dividendTax": 2888,
        "totalTax": 31096,
        "netAnnual": 52904
      }
    },
    {
      "scenario": "£450/day Umbrella, 15 days/month",
      "inputs": {"dailyRate": 450, "daysPerMonth": 15, "structure": "Umbrella Company", "expensesPerDay": 0, "monthsPerYear": 12},
      "expectedOutputs": {
        "grossAnnual": 81000,
        "corporationTax": 0,
        "directorsSalary": 0,
        "dividends": 0,
        "payeTax": 23454,
        "nic": 4454,
        "dividendTax": 0,
        "totalTax": 27908,
        "netAnnual": 53092
      }
    }
  ]
};

export default ukContractorSalary;
