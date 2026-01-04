const irelandOvertimePay = {
  "id": "irelandOvertimePay",
  "name": "Ireland Overtime Pay Calculator",
  "description": "Calculate overtime pay and tax in Ireland",
  "inputs": [
    {
      "id": "baseSalary",
      "label": "Annual Base Salary (EUR)",
      "type": "number",
      "default": 40000,
      "unit": "€"
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
    "payeTax": "calculateIrelandPAYE(totalEarnings)",
    "payeTaxBase": "calculateIrelandPAYE(baseSalary)",
    "payeTaxOvertime": "payeTax - payeTaxBase",
    "usc": "calculateIrelandUSC(totalEarnings)",
    "uscBase": "calculateIrelandUSC(baseSalary)",
    "uscOvertime": "usc - uscBase",
    "prsi": "calculateIrelandPRSI(totalEarnings)",
    "prsiBase": "calculateIrelandPRSI(baseSalary)",
    "prsiOvertime": "prsi - prsiBase",
    "netOvertime": "grossOvertime - payeTaxOvertime - uscOvertime - prsiOvertime",
    "netBonus": "grossBonus > 0 ? calculateIrelandPAYE(baseSalary + grossOvertime + grossBonus) - calculateIrelandPAYE(baseSalary + grossOvertime) - (calculateIrelandUSC(baseSalary + grossOvertime + grossBonus) - calculateIrelandUSC(baseSalary + grossOvertime)) - (calculateIrelandPRSI(baseSalary + grossOvertime + grossBonus) - calculateIrelandPRSI(baseSalary + grossOvertime)) : 0",
    "totalNetSalary": "totalEarnings - payeTax - usc - prsi",
    "effectiveOvertimeTaxRate": "grossOvertime > 0 ? ((payeTaxOvertime + uscOvertime + prsiOvertime) / grossOvertime) * 100 : 0"
  },
  "examples": [
    {
      "scenario": "€40,000 base + 5 hours OT weekly",
      "inputs": {"baseSalary": 40000, "contractedHoursPerWeek": 40, "otHoursPerWeek": 5, "otRate": "1.5", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 5000,
        "payeTaxOvertime": 1200,
        "uscOvertime": 350,
        "prsiOvertime": 200,
        "netOvertime": 3300,
        "totalNetSalary": 32300
      }
    },
    {
      "scenario": "€60,000 base + 10 hours OT weekly",
      "inputs": {"baseSalary": 60000, "contractedHoursPerWeek": 40, "otHoursPerWeek": 10, "otRate": "2.0", "bonusPercent": 0},
      "expectedOutputs": {
        "grossOvertime": 20000,
        "payeTaxOvertime": 6000,
        "uscOvertime": 1200,
        "prsiOvertime": 800,
        "netOvertime": 12400,
        "totalNetSalary": 52400
      }
    }
  ]
};

export default irelandOvertimePay;
