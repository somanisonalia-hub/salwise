const ukContractorSalary = {
  "id": "ukContractorSalary",
  "name": "UK Contractor Salary Calculator",
  "description": "Calculate contractor salary comparing Ltd company vs umbrella company structures",
  "inputs": [
    {
      "id": "contractRate",
      "label": "Annual Contract Rate (£)",
      "type": "number",
      "default": 60000,
      "unit": "£",
      "required": true
    },
    {
      "id": "ir35Status",
      "label": "IR35 Status",
      "type": "select",
      "options": [
        {"value": "Inside IR35", "label": "Inside IR35"},
        {"value": "Outside IR35", "label": "Outside IR35"}
      ],
      "default": "Inside IR35",
      "required": true
    },
    {
      "id": "expenses",
      "label": "Annual Expenses (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
      "optional": true
    }
  ],
  "formula": {
    "taxableIncome": "contractRate - expenses",
    "payeTax": "ir35Status === 'Inside IR35' ? calculateUKPAYE(taxableIncome) : 0",
    "nic": "ir35Status === 'Inside IR35' ? calculateUKNIC(taxableIncome) : 0",
    "totalTax": "payeTax + nic",
    "netAnnual": "taxableIncome - totalTax",
    "netMonthly": "netAnnual / 12",
    "effectiveTaxRate": "contractRate > 0 ? (totalTax / contractRate) * 100 : 0"
  },
  "outputs": [
    {"id": "taxableIncome", "label": "Taxable Income", "unit": "£"},
    {"id": "payeTax", "label": "PAYE Tax", "unit": "£"},
    {"id": "nic", "label": "National Insurance", "unit": "£"},
    {"id": "totalTax", "label": "Total Tax", "unit": "£"},
    {"id": "netAnnual", "label": "Net Annual Salary", "unit": "£"},
    {"id": "netMonthly", "label": "Net Monthly Salary", "unit": "£"},
    {"id": "effectiveTaxRate", "label": "Effective Tax Rate", "unit": "%"}
  ],
  "outputLabels": {
    "grossAnnual": "Gross Annual Income",
    "annualExpenses": "Annual Expenses",
    "taxableIncome": "Taxable Income",
    "corporationTax": "Corporation Tax",
    "directorsSalary": "Director's Salary",
    "dividends": "Dividends",
    "payeTax": "PAYE Tax",
    "nic": "National Insurance",
    "dividendTax": "Dividend Tax",
    "totalTax": "Total Tax",
    "netAnnual": "Net Annual Income",
    "netMonthly": "Net Monthly Income",
    "effectiveTaxRate": "Effective Tax Rate"
  },
  "outputUnits": {
    "grossAnnual": "£",
    "annualExpenses": "£",
    "taxableIncome": "£",
    "corporationTax": "£",
    "directorsSalary": "£",
    "dividends": "£",
    "payeTax": "£",
    "nic": "£",
    "dividendTax": "£",
    "totalTax": "£",
    "netAnnual": "£",
    "netMonthly": "£",
    "effectiveTaxRate": "%"
  },
  "examples": [
    {
      "scenario": "£60,000 contract, Inside IR35",
      "inputs": {"contractRate": 60000, "ir35Status": "Inside IR35", "expenses": 0},
      "expectedOutputs": {
        "taxableIncome": 60000,
        "payeTax": 8454,
        "nic": 3754,
        "totalTax": 12208,
        "netAnnual": 47792
      }
    }
  ]
};

export default ukContractorSalary;
