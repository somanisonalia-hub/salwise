const irelandContractorSalary = {
  "id": "irelandContractorSalary",
  "name": "Ireland Contractor Salary Calculator",
  "description": "Calculate contractor salary comparing Ltd company vs umbrella company structures",
  "inputs": [
    {
      "id": "contractRate",
      "label": "Contract Rate",
      "type": "number",
      "default": 70000,
      "unit": "€",
      "required": true,
      "min": 0
    },
    {
      "id": "contractorType",
      "label": "Contractor Type",
      "type": "select",
      "options": [
        {"value": "Ltd Company", "label": "Ltd Company"},
        {"value": "Umbrella Company", "label": "Umbrella Company"}
      ],
      "default": "Ltd Company",
      "required": true
    },
    {
      "id": "expenses",
      "label": "Business Expenses",
      "type": "number",
      "default": 0,
      "unit": "€",
      "required": false,
      "min": 0
    }
  ],
  "formula": {
    "adjustedContractRate": "contractRate - expenses",
    "corporationTax": "contractorType === 'Ltd Company' ? adjustedContractRate * 0.125 : 0",
    "dividendIncome": "contractorType === 'Ltd Company' ? adjustedContractRate - corporationTax : 0",
    "dividendTax": "contractorType === 'Ltd Company' ? calculateIrelandPAYE(dividendIncome) : 0",
    "umbrellaPAYE": "contractorType === 'Umbrella Company' ? calculateIrelandPAYE(adjustedContractRate) : 0",
    "umbrellaPRSI": "contractorType === 'Umbrella Company' ? adjustedContractRate * 0.04 : 0",
    "umbrellaUSC": "contractorType === 'Umbrella Company' ? calculateIrelandUSC(adjustedContractRate) : 0",
    "totalLtdTax": "corporationTax + dividendTax",
    "totalUmbrellaTax": "umbrellaPAYE + umbrellaPRSI + umbrellaUSC",
    "netLtd": "dividendIncome - dividendTax",
    "netUmbrella": "adjustedContractRate - totalUmbrellaTax",
    "netIncome": "contractorType === 'Ltd Company' ? netLtd : netUmbrella"
  },
  "outputs": [
    {"id": "adjustedContractRate", "label": "Adjusted Contract Rate", "unit": "€"},
    {"id": "corporationTax", "label": "Corporation Tax", "unit": "€"},
    {"id": "dividendIncome", "label": "Dividend Income", "unit": "€"},
    {"id": "dividendTax", "label": "Dividend Tax", "unit": "€"},
    {"id": "umbrellaPAYE", "label": "PAYE (Umbrella)", "unit": "€"},
    {"id": "umbrellaPRSI", "label": "PRSI (Umbrella)", "unit": "€"},
    {"id": "umbrellaUSC", "label": "USC (Umbrella)", "unit": "€"},
    {"id": "totalLtdTax", "label": "Total Ltd Tax", "unit": "€"},
    {"id": "totalUmbrellaTax", "label": "Total Umbrella Tax", "unit": "€"},
    {"id": "netIncome", "label": "Net Income", "unit": "€"}
  ],
  "examples": [
    {
      "scenario": "€70,000 Umbrella Company contract",
      "inputs": {"contractRate": 70000, "contractorType": "Umbrella Company", "expenses": 0},
      "expectedOutputs": {
        "adjustedContractRate": 70000,
        "corporationTax": 0,
        "umbrellaPAYE": 11000,
        "umbrellaPRSI": 2800,
        "umbrellaUSC": 3100,
        "totalUmbrellaTax": 16900,
        "netIncome": 53100
      }
    }
  ]
};

export default irelandContractorSalary;
