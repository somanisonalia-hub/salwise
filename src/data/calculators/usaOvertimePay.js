const usaOvertimePay = {
  "id": "usaOvertimePay",
  "name": "USA Overtime Pay Calculator",
  "description": "Calculate overtime pay and tax in the USA",
  "inputs": [
    {
      "id": "baseSalary",
      "label": "Annual Base Salary ($)",
      "type": "number",
      "default": 60000,
      "unit": "$"
    },
    {
      "id": "otHoursPerWeek",
      "label": "Overtime Hours per Week",
      "type": "number",
      "default": 5,
      "unit": "hours",
      "min": 0,
      "max": 20
    },
    {
      "id": "otRate",
      "label": "Overtime Rate Multiplier",
      "type": "select",
      "options": ["1.5", "2.0"],
      "default": "1.5"
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
      "id": "bonusPercent",
      "label": "Annual Bonus (%)",
      "type": "number",
      "default": 0,
      "unit": "%",
      "optional": true,
      "min": 0,
      "max": 50
    }
  ],
  "formula": {
    "hourlyBaseRate": "baseSalary / 52 / 40",
    "otHourlyRate": "hourlyBaseRate * parseFloat(otRate)",
    "grossOvertime": "otHourlyRate * otHoursPerWeek * 52",
    "grossBonus": "baseSalary * bonusPercent / 100",
    "totalEarnings": "baseSalary + grossOvertime + grossBonus",
    "federalTax": "calculateUSAFederalTax(totalEarnings)",
    "federalTaxBase": "calculateUSAFederalTax(baseSalary)",
    "federalTaxOvertime": "federalTax - federalTaxBase",
    "stateTax": "calculateUSAStateTax(totalEarnings, state)",
    "stateTaxBase": "calculateUSAStateTax(baseSalary, state)",
    "stateTaxOvertime": "stateTax - stateTaxBase",
    "socialSecurity": "Math.min(totalEarnings * 0.062, 160200 * 0.062)",
    "socialSecurityBase": "Math.min(baseSalary * 0.062, 160200 * 0.062)",
    "socialSecurityOvertime": "socialSecurity - socialSecurityBase",
    "medicare": "totalEarnings * 0.0145",
    "medicareBase": "baseSalary * 0.0145",
    "medicareOvertime": "medicare - medicareBase",
    "netOvertime": "grossOvertime - federalTaxOvertime - stateTaxOvertime - socialSecurityOvertime - medicareOvertime",
    "netBonus": "grossBonus > 0 ? calculateUSAFederalTax(baseSalary + grossOvertime + grossBonus) - calculateUSAFederalTax(baseSalary + grossOvertime) - (calculateUSAStateTax(baseSalary + grossOvertime + grossBonus, state) - calculateUSAStateTax(baseSalary + grossOvertime, state)) - (Math.min((baseSalary + grossOvertime + grossBonus) * 0.062, 160200 * 0.062) - Math.min((baseSalary + grossOvertime) * 0.062, 160200 * 0.062)) - ((baseSalary + grossOvertime + grossBonus) * 0.0145 - (baseSalary + grossOvertime) * 0.0145) : 0",
    "totalNetSalary": "totalEarnings - federalTax - stateTax - socialSecurity - medicare",
    "effectiveOvertimeTaxRate": "grossOvertime > 0 ? ((federalTaxOvertime + stateTaxOvertime + socialSecurityOvertime + medicareOvertime) / grossOvertime) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "$60,000 base + 5 hours OT weekly in New York",
      "inputs": {"baseSalary": 60000, "otHoursPerWeek": 5, "otRate": "1.5", "state": "NY", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 7500,
        "federalTaxOvertime": 1500,
        "stateTaxOvertime": 300,
        "socialSecurityOvertime": 465,
        "medicareOvertime": 109,
        "netOvertime": 5126,
        "totalNetSalary": 47100
      }
    },
    {
      "scenario": "$80,000 base + 10 hours OT weekly in California",
      "inputs": {"baseSalary": 80000, "otHoursPerWeek": 10, "otRate": "2.0", "state": "CA", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 30000,
        "federalTaxOvertime": 9000,
        "stateTaxOvertime": 2850,
        "socialSecurityOvertime": 1860,
        "medicareOvertime": 435,
        "netOvertime": 15855,
        "totalNetSalary": 78000
      }
    }
  ]
};

export default usaOvertimePay;
