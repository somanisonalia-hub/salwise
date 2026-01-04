const ukBonusTax = {
  "id": "ukBonusTax",
  "name": "UK Bonus Tax Calculator",
  "description": "Calculate bonus tax and net bonus pay in the UK",
  "inputs": [
    {
      "id": "bonusAmount",
      "label": "Bonus Amount (£)",
      "type": "number",
      "default": 5000,
      "unit": "£"
    }
  ],
  "outputs": [
    {
      "id": "bonusTax",
      "label": "Bonus Tax",
      "unit": "currency",
      "description": "Total tax on bonus (PAYE + NIC)"
    },
    {
      "id": "netBonus",
      "label": "Net Bonus",
      "unit": "currency",
      "description": "Take-home bonus after tax"
    }
  ],
  "formula": {
    "bonusTax": "calculateUKPAYE(bonusAmount) + calculateUKNIC(bonusAmount)",
    "netBonus": "bonusAmount - bonusTax"
  },
  "examples": [
    {
      "scenario": "£5,000 bonus",
      "inputs": {"bonusAmount": 5000},
      "expectedOutputs": {
        "bonusTax": 1500,
        "netBonus": 3500
      }
    }
  ]
};

export default ukBonusTax;
