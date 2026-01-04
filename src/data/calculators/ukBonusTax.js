const ukBonusTax = {
  "id": "ukBonusTax",
  "name": "UK Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in the UK",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Annual Gross Salary (£)",
      "type": "number",
      "default": 40000,
      "unit": "£"
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
    "payeTax": "calculateUKPAYE(totalEarnings)",
    "payeTaxBase": "calculateUKPAYE(grossSalary)",
    "payeTaxBonus": "grossOvertime > 0 ? calculateUKPAYE(grossSalary + grossOvertime + grossBonus) - calculateUKPAYE(grossSalary + grossOvertime) : calculateUKPAYE(grossSalary + grossBonus) - calculateUKPAYE(grossSalary)",
    "nic": "calculateUKNIC(totalEarnings)",
    "nicBase": "calculateUKNIC(grossSalary)",
    "nicBonus": "grossOvertime > 0 ? calculateUKNIC(grossSalary + grossOvertime + grossBonus) - calculateUKNIC(grossSalary + grossOvertime) : calculateUKNIC(grossSalary + grossBonus) - calculateUKNIC(grossSalary)",
    "netBonus": "grossBonus - payeTaxBonus - nicBonus",
    "netOvertime": "grossOvertime > 0 ? grossOvertime - (payeTax - payeTaxBase - payeTaxBonus) - (nic - nicBase - nicBonus) : 0",
    "totalNetSalary": "totalEarnings - payeTax - nic",
    "effectiveBonusTaxRate": "grossBonus > 0 ? ((payeTaxBonus + nicBonus) / grossBonus) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "£40,000 salary + 5% bonus",
      "inputs": {"grossSalary": 40000, "bonusPercent": 5, "otHoursPerWeek": 0, "otRate": "1.5", "contractedHoursPerWeek": 40},
      "expectedOutputs": {
        "grossBonus": 2000,
        "payeTaxBonus": 520,
        "nicBonus": 140,
        "netBonus": 1320,
        "totalNetSalary": 31320
      }
    },
    {
      "scenario": "£60,000 salary + 10% bonus",
      "inputs": {"grossSalary": 60000, "bonusPercent": 10, "otHoursPerWeek": 0, "otRate": "1.5", "contractedHoursPerWeek": 40},
      "expectedOutputs": {
        "grossBonus": 6000,
        "payeTaxBonus": 1920,
        "nicBonus": 480,
        "netBonus": 3720,
        "totalNetSalary": 43720
      }
    }
  ]
};

export default ukBonusTax;
