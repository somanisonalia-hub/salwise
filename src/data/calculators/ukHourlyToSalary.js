const ukHourlyToSalary = {
  "id": "ukHourlyToSalary",
  "name": "UK Hourly to Salary Calculator",
  "description": "Convert hourly pay to annual salary in the UK with tax calculations",
  "inputs": [
    {
      "id": "hourlyRate",
      "label": "Hourly Rate (£)",
      "type": "number",
      "default": 15,
      "unit": "£"
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
    },
    {
      "id": "pensionPercent",
      "label": "Pension Contribution (%)",
      "type": "number",
      "default": 0,
      "unit": "%",
      "min": 0,
      "max": 100,
      "optional": true
    }
  ],
  "formula": {
    "grossAnnualSalary": "hourlyRate * hoursPerWeek * 52",
    "payeTax": "calculateUKPAYE(grossAnnualSalary)",
    "nic": "calculateUKNIC(grossAnnualSalary)",
    "pensionContribution": "grossAnnualSalary * pensionPercent / 100",
    "totalDeductions": "payeTax + nic + pensionContribution",
    "netAnnualSalary": "grossAnnualSalary - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / grossAnnualSalary) * 100"
  },
  "examples": [
    {
      "scenario": "£15/hour, 40 hours/week",
      "inputs": {"hourlyRate": 15, "hoursPerWeek": 40, "payFrequency": "Annual", "pensionPercent": 0},
      "expectedOutputs": {
        "grossAnnualSalary": 31200,
        "payeTax": 3654,
        "nic": 1298,
        "totalDeductions": 4952,
        "netAnnualSalary": 26248
      }
    },
    {
      "scenario": "£25/hour, 35 hours/week",
      "inputs": {"hourlyRate": 25, "hoursPerWeek": 35, "payFrequency": "Annual", "pensionPercent": 0},
      "expectedOutputs": {
        "grossAnnualSalary": 45500,
        "payeTax": 7254,
        "nic": 2054,
        "totalDeductions": 9308,
        "netAnnualSalary": 36192
      }
    }
  ]
};

export default ukHourlyToSalary;
