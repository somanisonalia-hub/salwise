const usaSalaryCalculator = {
  "id": "usaSalaryCalculator",
  "name": "USA Salary Calculator",
  "description": "Calculate take-home pay in the USA including federal tax, state tax, Social Security, Medicare, and 401k",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Gross Annual Salary ($)",
      "type": "number",
      "default": 60000,
      "unit": "$"
    },
    {
      "id": "state",
      "label": "State",
      "type": "select",
      "options": [
        {"value": "AL", "label": "Alabama (5.00%)"},
        {"value": "AK", "label": "Alaska (0.00%)"},
        {"value": "AZ", "label": "Arizona (2.59%)"},
        {"value": "AR", "label": "Arkansas (4.90%)"},
        {"value": "CA", "label": "California (9.55%)"},
        {"value": "CO", "label": "Colorado (4.40%)"},
        {"value": "CT", "label": "Connecticut (4.95%)"},
        {"value": "DE", "label": "Delaware (4.80%)"},
        {"value": "FL", "label": "Florida (0.00%)"},
        {"value": "GA", "label": "Georgia (4.99%)"},
        {"value": "HI", "label": "Hawaii (7.25%)"},
        {"value": "ID", "label": "Idaho (4.83%)"},
        {"value": "IL", "label": "Illinois (4.95%)"},
        {"value": "IN", "label": "Indiana (3.15%)"},
        {"value": "IA", "label": "Iowa (4.82%)"},
        {"value": "KS", "label": "Kansas (4.50%)"},
        {"value": "KY", "label": "Kentucky (4.80%)"},
        {"value": "LA", "label": "Louisiana (4.25%)"},
        {"value": "ME", "label": "Maine (5.80%)"},
        {"value": "MD", "label": "Maryland (4.75%)"},
        {"value": "MA", "label": "Massachusetts (5.00%)"},
        {"value": "MI", "label": "Michigan (4.25%)"},
        {"value": "MN", "label": "Minnesota (5.25%)"},
        {"value": "MS", "label": "Mississippi (5.00%)"},
        {"value": "MO", "label": "Missouri (4.00%)"},
        {"value": "MT", "label": "Montana (4.10%)"},
        {"value": "NE", "label": "Nebraska (4.25%)"},
        {"value": "NV", "label": "Nevada (0.00%)"},
        {"value": "NH", "label": "New Hampshire (4.00%)"},
        {"value": "NJ", "label": "New Jersey (5.53%)"},
        {"value": "NM", "label": "New Mexico (4.90%)"},
        {"value": "NY", "label": "New York (4.00%)"},
        {"value": "NC", "label": "North Carolina (4.75%)"},
        {"value": "ND", "label": "North Dakota (2.90%)"},
        {"value": "OH", "label": "Ohio (3.99%)"},
        {"value": "OK", "label": "Oklahoma (4.75%)"},
        {"value": "OR", "label": "Oregon (4.75%)"},
        {"value": "PA", "label": "Pennsylvania (3.07%)"},
        {"value": "RI", "label": "Rhode Island (4.99%)"},
        {"value": "SC", "label": "South Carolina (3.00%)"},
        {"value": "SD", "label": "South Dakota (0.00%)"},
        {"value": "TN", "label": "Tennessee (0.00%)"},
        {"value": "TX", "label": "Texas (0.00%)"},
        {"value": "UT", "label": "Utah (4.95%)"},
        {"value": "VT", "label": "Vermont (3.59%)"},
        {"value": "VA", "label": "Virginia (5.75%)"},
        {"value": "WA", "label": "Washington (0.00%)"},
        {"value": "WV", "label": "West Virginia (4.72%)"},
        {"value": "WI", "label": "Wisconsin (3.50%)"},
        {"value": "WY", "label": "Wyoming (0.00%)"}
      ],
      "default": "CA"
    },
    {
      "id": "payFrequency",
      "label": "Pay Frequency",
      "type": "select",
      "options": ["Annual", "Monthly", "Weekly"],
      "default": "Annual"
    },
    {
      "id": "hoursPerWeek",
      "label": "Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "optional": true,
      "dependsOn": {"payFrequency": ["Weekly"]}
    },
    {
      "id": "bonus",
      "label": "Annual Bonus ($)",
      "type": "number",
      "default": 0,
      "unit": "$",
      "optional": true
    },
    {
      "id": "overtime",
      "label": "Annual Overtime ($)",
      "type": "number",
      "default": 0,
      "unit": "$",
      "optional": true
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
    },
    {
      "id": "otherDeductions",
      "label": "Other Annual Deductions ($)",
      "type": "number",
      "default": 0,
      "unit": "$",
      "optional": true
    }
  ],
  "formula": {
    "grossAnnualSalary": "grossSalary",
    "totalTaxableIncome": "grossSalary + bonus + overtime",
    "federalTax": "calculateUSAFederalTax(totalTaxableIncome)",
    "stateTax": "calculateUSAStateTax(totalTaxableIncome, state)",
    "socialSecurity": "Math.min(totalTaxableIncome * 0.062, 160200 * 0.062)",
    "medicare": "totalTaxableIncome * 0.0145",
    "fourOOneKContribution": "grossSalary * fourOOneKPercent / 100",
    "totalDeductions": "federalTax + stateTax + socialSecurity + medicare + fourOOneKContribution + otherDeductions",
    "netAnnualSalary": "totalTaxableIncome - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / totalTaxableIncome) * 100"
  },
  "examples": [
    {
      "scenario": "$50,000 in New York",
      "inputs": {"grossSalary": 50000, "state": "NY", "payFrequency": "Annual", "bonus": 0, "overtime": 0, "fourOOneKPercent": 0, "otherDeductions": 0},
      "expectedOutputs": {
        "federalTax": 6890,
        "stateTax": 2250,
        "socialSecurity": 3100,
        "medicare": 725,
        "totalDeductions": 12965,
        "netAnnualSalary": 37035
      }
    },
    {
      "scenario": "$80,000 in California with 5% 401k",
      "inputs": {"grossSalary": 80000, "state": "CA", "payFrequency": "Annual", "bonus": 0, "overtime": 0, "fourOOneKPercent": 5, "otherDeductions": 0},
      "expectedOutputs": {
        "federalTax": 14790,
        "stateTax": 5840,
        "socialSecurity": 4960,
        "medicare": 1160,
        "fourOOneKContribution": 4000,
        "totalDeductions": 30750,
        "netAnnualSalary": 49250
      }
    }
  ]
};

export default usaSalaryCalculator;
