export default {
  "id": "irelandOvertimePay",
  "name": "Ireland Overtime Pay Calculator",
  "description": "Calculate overtime pay in Ireland with tax deductions",
  "inputs": [
    {
      "id": "baseHourlyRate",
      "label": "Base Hourly Rate",
      "type": "number",
      "default": 25,
      "unit": "€",
      "required": true,
      "min": 0,
      "max": 500,
      "description": "Your regular hourly pay rate"
    },
    {
      "id": "overtimeHoursPerWeek",
      "label": "Overtime Hours per Week",
      "type": "number",
      "default": 5,
      "unit": "hours",
      "required": true,
      "min": 0,
      "max": 40,
      "description": "Number of overtime hours worked per week"
    },
    {
      "id": "overtimeMultiplier",
      "label": "Overtime Multiplier",
      "type": "number",
      "default": 1.5,
      "unit": "x",
      "required": true,
      "min": 1,
      "max": 3,
      "step": 0.1,
      "description": "Time-and-a-half = 1.5, Double time = 2.0"
    }
  ],
  "outputs": [
    {
      "id": "overtimeHourlyRate",
      "label": "Overtime Hourly Rate",
      "formula": "baseHourlyRate * overtimeMultiplier",
      "unit": "€"
    },
    {
      "id": "grossOvertimeWeekly",
      "label": "Gross Overtime Pay (Weekly)",
      "formula": "baseHourlyRate * overtimeMultiplier * overtimeHoursPerWeek",
      "unit": "€"
    },
    {
      "id": "grossOvertimeAnnual",
      "label": "Gross Overtime Pay (Annual)",
      "formula": "grossOvertimeWeekly * 52",
      "unit": "€"
    },
    {
      "id": "taxOnOvertime",
      "label": "Tax on Overtime",
      "formula": "calculateIrelandPAYE(grossOvertimeAnnual) + calculateIrelandUSC(grossOvertimeAnnual) + calculateIrelandPRSI(grossOvertimeAnnual)",
      "unit": "€"
    },
    {
      "id": "netOvertimeWeekly",
      "label": "Net Overtime Pay (Weekly)",
      "formula": "grossOvertimeWeekly - (taxOnOvertime / 52)",
      "unit": "€"
    },
    {
      "id": "netOvertimeAnnual",
      "label": "Net Overtime Pay (Annual)",
      "formula": "grossOvertimeAnnual - taxOnOvertime",
      "unit": "€"
    },
    {
      "id": "effectiveOvertimeTaxRate",
      "label": "Effective Overtime Tax Rate",
      "formula": "grossOvertimeAnnual > 0 ? (taxOnOvertime / grossOvertimeAnnual) * 100 : 0",
      "unit": "%"
    }
  ],
  "examples": [
    {
      "scenario": "€25/hour base, 5 hours OT/week at time-and-a-half",
      "inputs": {"baseHourlyRate": 25, "overtimeHoursPerWeek": 5, "overtimeMultiplier": 1.5},
      "expectedOutputs": {
        "overtimeHourlyRate": 37.5,
        "grossOvertimeWeekly": 187.5,
        "grossOvertimeAnnual": 9750,
        "taxOnOvertime": 1988,
        "netOvertimeWeekly": 154.69,
        "netOvertimeAnnual": 7762
      }
    },
    {
      "scenario": "€30/hour base, 10 hours OT/week at double time",
      "inputs": {"baseHourlyRate": 30, "overtimeHoursPerWeek": 10, "overtimeMultiplier": 2.0},
      "expectedOutputs": {
        "overtimeHourlyRate": 60,
        "grossOvertimeWeekly": 600,
        "grossOvertimeAnnual": 31200,
        "taxOnOvertime": 8082,
        "netOvertimeWeekly": 461.54,
        "netOvertimeAnnual": 23118
      }
    }
  ]
};
