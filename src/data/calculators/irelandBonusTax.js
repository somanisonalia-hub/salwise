const irelandBonusTax = {
  "id": "irelandBonusTax",
  "name": "Ireland Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in Ireland",
  "inputs": [
    {
      "id": "bonusAmount",
      "label": "Bonus Amount",
      "type": "number",
      "default": 5000,
      "unit": "€",
      "required": true,
      "min": 0
    }
  ],
  "formula": {
    "bonusTax": "calculateIrelandPAYE(bonusAmount)",
    "netBonus": "bonusAmount - bonusTax"
  },
  "examples": [
    {
      "scenario": "€5,000 bonus",
      "inputs": {"bonusAmount": 5000},
      "expectedOutputs": {
        "bonusTax": 1500,
        "netBonus": 3500
      }
    }
  ]
};

export default irelandBonusTax;
