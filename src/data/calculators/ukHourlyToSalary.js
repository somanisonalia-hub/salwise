const ukHourlyToSalary = {
  "id": "ukHourlyToSalary",
  "name": "UK Hourly to Salary Calculator",
  "description": "Convert hourly pay to annual salary in the UK with tax calculations",
  "inputs": [
    {
      "id": "hourlyRate",
      "label": "Hourly Rate (£)",
      "type": "number",
      "default": 25,
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
      "id": "weeksPerYear",
      "label": "Weeks per Year",
      "type": "number",
      "default": 52,
      "unit": "weeks",
      "min": 1,
      "max": 53
    },
    {
      "id": "bonus",
      "label": "Annual Bonus (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
      "optional": true
    }
  ],
  "formula": {
    "grossAnnualSalary": "hourlyRate * hoursPerWeek * weeksPerYear",
    "totalAnnualSalary": "grossAnnualSalary + bonus",
    "payeTax": "calculateUKPAYE(totalAnnualSalary)",
    "nic": "calculateUKNIC(totalAnnualSalary)",
    "totalDeductions": "payeTax + nic",
    "netAnnualSalary": "totalAnnualSalary - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / totalAnnualSalary) * 100"
  },
  "examples": [
    {
      "scenario": "£25/hour, 40 hours/week, 52 weeks/year",
      "inputs": {"hourlyRate": 25, "hoursPerWeek": 40, "weeksPerYear": 52, "bonus": 0},
      "expectedOutputs": {
        "grossAnnualSalary": 52000,
        "totalAnnualSalary": 52000,
        "payeTax": 8454,
        "nic": 3754,
        "totalDeductions": 12208,
        "netAnnualSalary": 39792
      }
    }
  ]
};

export default ukHourlyToSalary;
