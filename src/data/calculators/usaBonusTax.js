const usaBonusTax = {
  "id": "usaBonusTax",
  "name": "USA Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in the USA",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Annual Gross Salary ($)",
      "type": "number",
      "default": 60000,
      "unit": "$"
    },
    {
      "id": "bonusPercent",
      "label": "Bonus Percentage (%)",
      "type": "number",
      "default": 5,
      "unit": "%",
      "min": 0,
      "max": 50
    },
    {
      "id": "state",
      "label": "State",
      "type": "select",
      "options": [
        {"value": "CA", "label": "California"},
        {"value": "NY", "label": "New York"},
        {"value": "TX", "label": "Texas"}
      ],
      "default": "CA"
    },
    {
      "id": "otHoursPerWeek",
      "label": "Overtime Hours per Week",
      "type": "number",
      "default": 0,
      "unit": "hours",
      "optional": true,
      "min": 0,
      "max": 20
    },
    {
      "id": "otRate",
      "label": "Overtime Rate Multiplier",
      "type": "select",
      "options": ["1.5", "2.0"],
      "default": "1.5",
      "optional": true
    }
  ],
  "formula": {
    "grossBonus": "grossSalary * bonusPercent / 100",
    "grossOvertime": "otHoursPerWeek > 0 ? (grossSalary / 52 / 40) * otHoursPerWeek * 52 * parseFloat(otRate) : 0",
    "totalEarnings": "grossSalary + grossBonus + grossOvertime",
    "federalTax": "calculateUSAFederalTax(totalEarnings)",
    "federalTaxBase": "calculateUSAFederalTax(grossSalary)",
    "federalTaxBonus": "grossOvertime > 0 ? calculateUSAFederalTax(grossSalary + grossOvertime + grossBonus) - calculateUSAFederalTax(grossSalary + grossOvertime) : calculateUSAFederalTax(grossSalary + grossBonus) - calculateUSAFederalTax(grossSalary)",
    "stateTax": "calculateUSAStateTax(totalEarnings, state)",
    "stateTaxBase": "calculateUSAStateTax(grossSalary, state)",
    "stateTaxBonus": "grossOvertime > 0 ? calculateUSAStateTax(grossSalary + grossOvertime + grossBonus, state) - calculateUSAStateTax(grossSalary + grossOvertime, state) : calculateUSAStateTax(grossSalary + grossBonus, state) - calculateUSAStateTax(grossSalary, state)",
    "socialSecurity": "Math.min(totalEarnings * 0.062, 160200 * 0.062)",
    "socialSecurityBase": "Math.min(grossSalary * 0.062, 160200 * 0.062)",
    "socialSecurityBonus": "grossOvertime > 0 ? Math.min((grossSalary + grossOvertime + grossBonus) * 0.062, 160200 * 0.062) - Math.min((grossSalary + grossOvertime) * 0.062, 160200 * 0.062) : Math.min((grossSalary + grossBonus) * 0.062, 160200 * 0.062) - Math.min(grossSalary * 0.062, 160200 * 0.062)",
    "medicare": "totalEarnings * 0.0145",
    "medicareBase": "grossSalary * 0.0145",
    "medicareBonus": "grossOvertime > 0 ? (grossSalary + grossOvertime + grossBonus) * 0.0145 - (grossSalary + grossOvertime) * 0.0145 : (grossSalary + grossBonus) * 0.0145 - grossSalary * 0.0145",
    "netBonus": "grossBonus - federalTaxBonus - stateTaxBonus - socialSecurityBonus - medicareBonus",
    "netOvertime": "grossOvertime > 0 ? grossOvertime - (federalTax - federalTaxBase - federalTaxBonus) - (stateTax - stateTaxBase - stateTaxBonus) - (socialSecurity - socialSecurityBase - socialSecurityBonus) - (medicare - medicareBase - medicareBonus) : 0",
    "totalNetSalary": "totalEarnings - federalTax - stateTax - socialSecurity - medicare",
    "effectiveBonusTaxRate": "grossBonus > 0 ? ((federalTaxBonus + stateTaxBonus + socialSecurityBonus + medicareBonus) / grossBonus) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "$60,000 salary + 5% bonus in New York",
      "inputs": {"grossSalary": 60000, "bonusPercent": 5, "state": "NY", "otHoursPerWeek": 0, "otRate": "1.5"},
      "expectedOutputs": {
        "grossBonus": 3000,
        "federalTaxBonus": 720,
        "stateTaxBonus": 120,
        "socialSecurityBonus": 186,
        "medicareBonus": 44,
        "netBonus": 1930,
        "totalNetSalary": 45920
      }
    },
    {
      "scenario": "$90,000 salary + 10% bonus in California",
      "inputs": {"grossSalary": 90000, "bonusPercent": 10, "state": "CA", "otHoursPerWeek": 0, "otRate": "1.5"},
      "expectedOutputs": {
        "grossBonus": 9000,
        "federalTaxBonus": 2700,
        "stateTaxBonus": 855,
        "socialSecurityBonus": 558,
        "medicareBonus": 131,
        "netBonus": 3756,
        "totalNetSalary": 70400
      }
    }
  ]
};

export default usaBonusTax;
