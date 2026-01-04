const usaHourlyToSalary = {
  "id": "usaHourlyToSalary",
  "name": "USA Hourly to Salary Calculator",
  "description": "Convert hourly pay to annual salary in the USA with tax calculations",
  "inputs": [
    {
      "id": "hourlyRate",
      "label": "Hourly Rate ($)",
      "type": "number",
      "default": 20,
      "unit": "$"
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
      "id": "state",
      "label": "State",
      "type": "select",
      "options": [
        {"value": "CA", "label": "California"},
        {"value": "NY", "label": "New York"},
        {"value": "TX", "label": "Texas"},
        {"value": "FL", "label": "Florida"}
      ],
      "default": "CA"
    },
    {
      "id": "payFrequency",
      "label": "Display Period",
      "type": "select",
      "options": ["Annual", "Monthly", "Weekly"],
      "default": "Annual"
    },
    {
      "id": "fourOOneKPercent",
      "label": "401(k) Contribution (%)",
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
    "federalTax": "calculateUSAFederalTax(grossAnnualSalary)",
    "stateTax": "calculateUSAStateTax(grossAnnualSalary, state)",
    "socialSecurity": "Math.min(grossAnnualSalary * 0.062, 160200 * 0.062)",
    "medicare": "grossAnnualSalary * 0.0145",
    "fourOOneKContribution": "grossAnnualSalary * fourOOneKPercent / 100",
    "totalDeductions": "federalTax + stateTax + socialSecurity + medicare + fourOOneKContribution",
    "netAnnualSalary": "grossAnnualSalary - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / grossAnnualSalary) * 100"
  },
  "examples": [
    {
      "scenario": "$20/hour, 40 hours/week in California",
      "inputs": {"hourlyRate": 20, "hoursPerWeek": 40, "state": "CA", "payFrequency": "Annual", "fourOOneKPercent": 0},
      "expectedOutputs": {
        "grossAnnualSalary": 41600,
        "federalTax": 4890,
        "stateTax": 3928,
        "socialSecurity": 2579,
        "medicare": 603,
        "totalDeductions": 12000,
        "netAnnualSalary": 29600
      }
    },
    {
      "scenario": "$35/hour, 35 hours/week in New York",
      "inputs": {"hourlyRate": 35, "hoursPerWeek": 35, "state": "NY", "payFrequency": "Annual", "fourOOneKPercent": 0},
      "expectedOutputs": {
        "grossAnnualSalary": 63700,
        "federalTax": 9790,
        "stateTax": 2548,
        "socialSecurity": 3949,
        "medicare": 923,
        "totalDeductions": 17210,
        "netAnnualSalary": 46490
      }
    }
  ]
};

export default usaHourlyToSalary;
