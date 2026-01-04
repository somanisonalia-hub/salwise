const ukOvertimePay = {
  "id": "ukOvertimePay",
  "name": "UK Overtime Pay Calculator",
  "description": "Calculate overtime pay and tax in the UK",
  "inputs": [
    {
      "id": "baseSalary",
      "label": "Annual Base Salary (£)",
      "type": "number",
      "default": 35000,
      "unit": "£"
    },
    {
      "id": "contractedHoursPerWeek",
      "label": "Contracted Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "min": 1,
      "max": 60
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
    "hourlyBaseRate": "baseSalary / 52 / contractedHoursPerWeek",
    "otHourlyRate": "hourlyBaseRate * parseFloat(otRate)",
    "grossOvertime": "otHourlyRate * otHoursPerWeek * 52",
    "grossBonus": "baseSalary * bonusPercent / 100",
    "totalEarnings": "baseSalary + grossOvertime + grossBonus",
    "payeTax": "calculateUKPAYE(totalEarnings)",
    "payeTaxBase": "calculateUKPAYE(baseSalary)",
    "payeTaxOvertime": "payeTax - payeTaxBase",
    "nic": "calculateUKNIC(totalEarnings)",
    "nicBase": "calculateUKNIC(baseSalary)",
    "nicOvertime": "nic - nicBase",
    "netOvertime": "grossOvertime - payeTaxOvertime - nicOvertime",
    "netBonus": "grossBonus > 0 ? calculateUKPAYE(baseSalary + grossOvertime + grossBonus) - calculateUKPAYE(baseSalary + grossOvertime) - (calculateUKNIC(baseSalary + grossOvertime + grossBonus) - calculateUKNIC(baseSalary + grossOvertime)) : 0",
    "totalNetSalary": "totalEarnings - payeTax - nic",
    "effectiveOvertimeTaxRate": "grossOvertime > 0 ? ((payeTaxOvertime + nicOvertime) / grossOvertime) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "£35,000 base + 5 hours OT weekly",
      "inputs": {"baseSalary": 35000, "contractedHoursPerWeek": 40, "otHoursPerWeek": 5, "otRate": "1.5", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 5000,
        "payeTaxOvertime": 1100,
        "nicOvertime": 350,
        "netOvertime": 3400,
        "totalNetSalary": 29400
      }
    },
    {
      "scenario": "£50,000 base + 10 hours OT weekly",
      "inputs": {"baseSalary": 50000, "contractedHoursPerWeek": 40, "otHoursPerWeek": 10, "otRate": "2.0", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 20000,
        "payeTaxOvertime": 6000,
        "nicOvertime": 1200,
        "netOvertime": 12800,
        "totalNetSalary": 42800
      }
    }
  ]
};

export default ukOvertimePay;
