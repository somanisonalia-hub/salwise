const irelandOvertimePay = {
  "id": "irelandOvertimePay",
  "name": "Ireland Overtime Pay Calculator",
  "description": "Calculate overtime pay and tax in Ireland",
  "inputs": [
    {
      "id": "baseHourlyRate",
      "label": "Base Hourly Rate",
      "type": "number",
      "default": 20,
      "unit": "€",
      "required": true,
      "min": 0
    },
    {
      "id": "overtimeHours",
      "label": "Overtime Hours",
      "type": "number",
      "default": 10,
      "unit": "hours",
      "required": true,
      "min": 0
    },
    {
      "id": "overtimeRate",
      "label": "Overtime Rate",
      "type": "select",
      "default": "1.5",
      "required": true,
      "options": [
        {"value": "1.5", "label": "1.5x"},
        {"value": "2.0", "label": "2.0x"}
      ]
    }
  ],
  "formula": {
    "overtimePay": "baseHourlyRate * overtimeHours * parseFloat(overtimeRate)"
  },
  "examples": [
    {
      "scenario": "€20/hour, 10 OT hours, 1.5x",
      "inputs": {"baseHourlyRate": 20, "overtimeHours": 10, "overtimeRate": "1.5"},
      "expectedOutputs": {
        "overtimePay": 300
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
