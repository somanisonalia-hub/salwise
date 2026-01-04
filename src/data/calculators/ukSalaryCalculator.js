const ukSalaryCalculator = {
  "id": "ukSalaryCalculator",
  "name": "UK Salary Calculator",
  "description": "Calculate take-home pay in the UK including PAYE, NIC, pension, and student loan",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Gross Annual Salary (£)",
      "type": "number",
      "default": 40000,
      "unit": "£"
    },
    {
      "id": "payFrequency",
      "label": "Pay Frequency",
      "type": "select",
      "options": ["Annual", "Monthly", "Weekly"],
      "default": "Annual"
    },
    {
      "id": "hoursPerWeek",
      "label": "Hours per Week",
      "type": "number",
      "default": 40,
      "unit": "hours",
      "optional": true,
      "dependsOn": {"payFrequency": ["Weekly"]}
    },
    {
      "id": "bonus",
      "label": "Annual Bonus (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
      "optional": true
    },
    {
      "id": "overtime",
      "label": "Annual Overtime (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
      "optional": true
    },
    {
      "id": "pensionPercent",
      "label": "Pension Contribution (%)",
      "type": "number",
      "default": 0,
      "unit": "%",
      "min": 0,
      "max": 100,
      "optional": true
    },
    {
      "id": "studentLoan",
      "label": "Student Loan Plan",
      "type": "select",
      "options": ["None", "Plan 1", "Plan 2", "Plan 4", "Plan 5"],
      "default": "None",
      "optional": true
    },
    {
      "id": "otherDeductions",
      "label": "Other Annual Deductions (£)",
      "type": "number",
      "default": 0,
      "unit": "£",
      "optional": true
    }
  ],
  "formula": {
    "grossAnnualSalary": "grossSalary",
    "totalTaxableIncome": "grossSalary + bonus + overtime",
    "personalAllowance": "12570",
    "payeTax": "calculateUKPAYE(totalTaxableIncome)",
    "nic": "calculateUKNIC(totalTaxableIncome)",
    "pensionContribution": "grossSalary * pensionPercent / 100",
    "studentLoanRepayment": "calculateUKStudentLoan(totalTaxableIncome, studentLoan)",
    "totalDeductions": "payeTax + nic + pensionContribution + studentLoanRepayment + otherDeductions",
    "netAnnualSalary": "totalTaxableIncome - totalDeductions",
    "netMonthlySalary": "netAnnualSalary / 12",
    "netWeeklySalary": "netAnnualSalary / 52",
    "effectiveTaxRate": "(totalDeductions / totalTaxableIncome) * 100"
  },
  "examples": [
    {
      "scenario": "£30,000 basic salary",
      "inputs": {"grossSalary": 30000, "payFrequency": "Annual", "bonus": 0, "overtime": 0, "pensionPercent": 0, "studentLoan": "None", "otherDeductions": 0},
      "expectedOutputs": {
        "payeTax": 3454,
        "nic": 1754,
        "totalDeductions": 5208,
        "netAnnualSalary": 24792
      }
    },
    {
      "scenario": "£50,000 with 5% pension",
      "inputs": {"grossSalary": 50000, "payFrequency": "Annual", "bonus": 0, "overtime": 0, "pensionPercent": 5, "studentLoan": "None", "otherDeductions": 0},
      "expectedOutputs": {
        "payeTax": 8454,
        "nic": 3754,
        "pensionContribution": 2500,
        "totalDeductions": 14708,
        "netAnnualSalary": 35292
      }
    }
  ]
};

export default ukSalaryCalculator;
