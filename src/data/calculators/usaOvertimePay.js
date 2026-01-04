const usaOvertimePay = {
  "id": "usaOvertimePay",
  "name": "USA Overtime Pay Calculator",
  "description": "Calculate overtime pay and tax in the USA",
  "inputs": [
    {
      "id": "baseHourlyRate",
      "label": "Base Hourly Rate ($)",
      "type": "number",
      "default": 35,
      "unit": "$"
    },
    {
      "id": "overtimeHours",
      "label": "Overtime Hours",
      "type": "number",
      "default": 10,
      "unit": "hours",
      "min": 0,
      "max": 100
    },
    {
      "id": "overtimeRate",
      "label": "Overtime Rate",
      "type": "number",
      "default": 1.5,
      "unit": "x",
      "min": 1,
      "max": 3,
      "step": 0.1
    }
  ],
  "outputs": [
    {
      "id": "overtimePay",
      "label": "Overtime Pay",
      "unit": "currency",
      "description": "Total overtime pay"
    }
  ],
  "formula": {
    "overtimePay": "baseHourlyRate * overtimeHours * overtimeRate"
  },
  "examples": [
    {
      "scenario": "$35/hour base + 10 hours OT at 1.5x",
      "inputs": {"baseHourlyRate": 35, "overtimeHours": 10, "overtimeRate": 1.5},
      "expectedOutputs": {
        "overtimePay": 525
      }
    }
  ]
};

export default usaOvertimePay;
