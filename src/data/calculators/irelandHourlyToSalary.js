const irelandHourlyToSalary = {
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
      "min": 0
    },
    {
      "id": "hoursPerWeek",
      "label": "Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "required": true,
      "min": 1,
      "max": 80
    },
    {
      "id": "weeksPerYear",
      "label": "Weeks per Year",
      "type": "number",
      "default": 52,
      "unit": "weeks",
      "required": true,
      "min": 1,
      "max": 52
    },
    {
      "id": "bonus",
      "label": "Annual Bonus/Commission",
      "type": "number",
      "unit": "€",
      "default": 0,
      "required": true,
      "min": 0
    }
  ],
  "formula": {
    "annualSalary": "hourlyRate * hoursPerWeek * weeksPerYear",
    "totalAnnualSalary": "annualSalary + bonus",
    "payeTax": "calculateIrelandPAYE(totalAnnualSalary)",
    "usc": "calculateIrelandUSC(totalAnnualSalary)",
    "prsi": "calculateIrelandPRSI(totalAnnualSalary)",
    "totalDeductions": "payeTax + usc + prsi",
    "netAnnualSalary": "totalAnnualSalary - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / totalAnnualSalary) * 100"
  },
  "examples": [
    {
      "scenario": "€20/hour, 40 hours/week, 52 weeks",
      "inputs": {"hourlyRate": 20, "hoursPerWeek": 40, "weeksPerYear": 52, "bonus": 0},
      "expectedOutputs": {
        "annualSalary": 41600,
        "totalAnnualSalary": 41600,
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
