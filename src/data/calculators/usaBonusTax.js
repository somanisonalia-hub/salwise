const usaBonusTax = {
  "id": "usaBonusTax",
  "name": "USA Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in the USA",
  "inputs": [
    {
      "id": "bonusAmount",
      "label": "Bonus Amount ($)",
      "type": "number",
      "default": 5000,
      "unit": "$"
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
    }
  ],
  "outputs": [
    {"id": "federalTax", "label": "Federal Income Tax", "unit": "currency"},
    {"id": "stateTax", "label": "State Income Tax", "unit": "currency"},
    {"id": "socialSecurity", "label": "Social Security", "unit": "currency"},
    {"id": "medicare", "label": "Medicare", "unit": "currency"},
    {"id": "totalTax", "label": "Total Tax", "unit": "currency"},
    {"id": "netBonus", "label": "Net Bonus", "unit": "currency"}
  ],
  "formula": {
    "federalTax": "calculateUSAFederalTax(bonusAmount)",
    "stateTax": "calculateUSAStateTax(bonusAmount, state)",
    "socialSecurity": "Math.min(bonusAmount * 0.062, 160200 * 0.062)",
    "medicare": "bonusAmount * 0.0145",
    "totalTax": "federalTax + stateTax + socialSecurity + medicare",
    "netBonus": "bonusAmount - totalTax"
  },
  "examples": [
    {
      "scenario": "$5,000 bonus in California",
      "inputs": {"bonusAmount": 5000, "state": "CA"},
      "expectedOutputs": {
        "federalTax": 750,
        "stateTax": 375,
        "socialSecurity": 310,
        "medicare": 73,
        "totalTax": 1508,
        "netBonus": 3492
      }
    }
  ]
};

export default usaBonusTax;
