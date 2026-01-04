const irelandHourlyToSalary = {
  "id": "irelandHourlyToSalary",
  "name": "Ireland Hourly to Salary Calculator",
  "description": "Convert hourly pay to annual salary in Ireland with tax calculations",
  "inputs": [
    {
      "id": "hourlyRate",
      "label": "Hourly Rate (EUR)",
      "type": "number",
      "default": 20,
      "unit": "€"
    },
    {
      "id": "hoursPerWeek",
      "label": "Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "min": 1,
      "max": 60
    },
    {
      "id": "payFrequency",
      "label": "Display Period",
      "type": "select",
      "options": ["Annual", "Monthly", "Weekly"],
      "default": "Annual"
    }
  ],
  "formula": {
    "grossAnnualSalary": "hourlyRate * hoursPerWeek * 52",
    "payeTax": "calculateIrelandPAYE(grossAnnualSalary)",
    "usc": "calculateIrelandUSC(grossAnnualSalary)",
    "prsi": "calculateIrelandPRSI(grossAnnualSalary)",
    "totalDeductions": "payeTax + usc + prsi",
    "netAnnualSalary": "grossAnnualSalary - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / grossAnnualSalary) * 100"
  },
  "examples": [
    {
      "scenario": "€20/hour, 40 hours/week",
      "inputs": {"hourlyRate": 20, "hoursPerWeek": 40, "payFrequency": "Annual"},
      "expectedOutputs": {
        "grossAnnualSalary": 41600,
        "payeTax": 5167,
        "usc": 1725,
        "prsi": 1664,
        "totalDeductions": 8556,
        "netAnnualSalary": 33044
      }
    },
    {
      "scenario": "€30/hour, 35 hours/week",
      "inputs": {"hourlyRate": 30, "hoursPerWeek": 35, "payFrequency": "Annual"},
      "expectedOutputs": {
        "grossAnnualSalary": 40950,
        "payeTax": 5167,
        "usc": 1725,
        "prsi": 1638,
        "totalDeductions": 8530,
        "netAnnualSalary": 32420
      }
    }
  ]
};

export default irelandHourlyToSalary;
