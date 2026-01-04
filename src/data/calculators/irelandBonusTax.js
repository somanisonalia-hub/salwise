const irelandBonusTax = {
  "id": "irelandBonusTax",
  "name": "Ireland Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in Ireland",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Annual Gross Salary (EUR)",
      "type": "number",
      "default": 50000,
      "unit": "€"
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
    },
    {
      "id": "contractedHoursPerWeek",
      "label": "Contracted Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "optional": true,
      "min": 1,
      "max": 60
    }
  ],
  "formula": {
    "grossBonus": "grossSalary * bonusPercent / 100",
    "grossOvertime": "otHoursPerWeek > 0 ? (grossSalary / 52 / contractedHoursPerWeek) * otHoursPerWeek * 52 * parseFloat(otRate) : 0",
    "totalEarnings": "grossSalary + grossBonus + grossOvertime",
    "payeTax": "calculateIrelandPAYE(totalEarnings)",
    "payeTaxBase": "calculateIrelandPAYE(grossSalary)",
    "payeTaxBonus": "grossOvertime > 0 ? calculateIrelandPAYE(grossSalary + grossOvertime + grossBonus) - calculateIrelandPAYE(grossSalary + grossOvertime) : calculateIrelandPAYE(grossSalary + grossBonus) - calculateIrelandPAYE(grossSalary)",
    "usc": "calculateIrelandUSC(totalEarnings)",
    "uscBase": "calculateIrelandUSC(grossSalary)",
    "uscBonus": "grossOvertime > 0 ? calculateIrelandUSC(grossSalary + grossOvertime + grossBonus) - calculateIrelandUSC(grossSalary + grossOvertime) : calculateIrelandUSC(grossSalary + grossBonus) - calculateIrelandUSC(grossSalary)",
    "prsi": "calculateIrelandPRSI(totalEarnings)",
    "prsiBase": "calculateIrelandPRSI(grossSalary)",
    "prsiBonus": "grossOvertime > 0 ? calculateIrelandPRSI(grossSalary + grossOvertime + grossBonus) - calculateIrelandPRSI(grossSalary + grossOvertime) : calculateIrelandPRSI(grossSalary + grossBonus) - calculateIrelandPRSI(grossSalary)",
    "netBonus": "grossBonus - payeTaxBonus - uscBonus - prsiBonus",
    "netOvertime": "grossOvertime > 0 ? grossOvertime - (payeTax - payeTaxBase - payeTaxBonus) - (usc - uscBase - uscBonus) - (prsi - prsiBase - prsiBonus) : 0",
    "totalNetSalary": "totalEarnings - payeTax - usc - prsi",
    "effectiveBonusTaxRate": "grossBonus > 0 ? ((payeTaxBonus + uscBonus + prsiBonus) / grossBonus) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "€50,000 salary + 5% bonus",
      "inputs": {"grossSalary": 50000, "bonusPercent": 5, "otHoursPerWeek": 0, "otRate": "1.5", "contractedHoursPerWeek": 40},
      "expectedOutputs": {
        "grossBonus": 2500,
        "payeTaxBonus": 600,
        "uscBonus": 175,
        "prsiBonus": 100,
        "netBonus": 1650,
        "totalNetSalary": 39150
      }
    },
    {
      "scenario": "€70,000 salary + 10% bonus",
      "inputs": {"grossSalary": 70000, "bonusPercent": 10, "otHoursPerWeek": 0, "otRate": "1.5", "contractedHoursPerWeek": 40},
      "expectedOutputs": {
        "grossBonus": 7000,
        "payeTaxBonus": 2200,
        "uscBonus": 500,
        "prsiBonus": 280,
        "netBonus": 4200,
        "totalNetSalary": 53200
      }
    }
  ]
};

export default irelandBonusTax;
