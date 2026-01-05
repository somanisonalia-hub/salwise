# SalaryWise Calculator Template System

## Overview
This document defines the standardized template system for all SalaryWise calculators, ensuring consistency, maintainability, and scalability across all calculator types.

## Calculator Categories

### Ireland Calculators (5)
- **Salary Calculator**: Core PAYE, USC, PRSI calculations
- **Hourly to Salary**: Convert hourly rates to annual salary
- **Overtime Pay**: Calculate overtime premiums
- **Bonus Tax**: Tax on annual bonuses
- **Contractor Salary**: Ltd vs Umbrella company structures

### UK Calculators (5)
- **Salary Calculator**: PAYE, NIC, Student Loan calculations
- **Hourly to Salary**: Convert hourly rates to annual salary
- **Overtime Pay**: Calculate overtime premiums
- **Bonus Tax**: Tax on annual bonuses
- **Contractor Salary**: Ltd vs Umbrella company structures

### USA Calculators (5)
- **Salary Calculator**: Federal, State, FICA calculations
- **Hourly to Salary**: Convert hourly rates to annual salary
- **Overtime Pay**: Calculate overtime premiums
- **Bonus Tax**: Tax on annual bonuses
- **Contractor Salary**: 1099 vs W2 structures

### Global Calculators (4)
- **Salary Calculator**: Cross-country comparison
- **Gross to Net Salary**: Educational conceptual calculator
- **Take Home Pay**: Simple custom tax rate calculator
- **Salary After Tax**: Detailed tax breakdown calculator

## Input Classification System

### Mandatory Inputs (Always Visible)
Required for basic calculation functionality.

| Input Type | Description | Examples |
|------------|-------------|----------|
| Number | Numeric values | Salary amount, hours, bonus |
| Dropdown | Predefined options | Payment frequency, country, state |
| Text | Free-form text | Job title, company name |

### Optional Inputs (Conditionally Visible)
Advanced options that appear based on user selections.

| Input Type | Trigger | Examples |
|------------|---------|----------|
| Checkbox | Toggles section visibility | "Include overtime", "Show advanced options" |
| Radio Buttons | Mutually exclusive options | Contractor type (Ltd/Umbrella) |
| Number | Appears when checkbox checked | Overtime hours, bonus amount |
| Slider | Percentage inputs | Retirement contribution % |
| Date Picker | Date-based calculations | Payroll start date |

## UI Layout Template

### Header Section
```
[Country Flag] [Country Name] [Calculator Type]
Example: 🇮🇪 Ireland Salary Calculator
```

### Mandatory Inputs Section
- Always visible
- Required fields marked with *
- Input validation
- Default values provided

### Optional Inputs Section
- Hidden by default
- Toggle via "Show Advanced Options" checkbox
- Collapsible/expandable design
- Clear labeling for each option

### Calculate Button
- Prominent placement
- Dynamic text: "Calculate [Calculator Type]"
- Loading state during calculation
- Error handling for invalid inputs

### Results Section
- Clean table/grid layout
- Key metrics prominently displayed
- Breakdown of tax components
- Visual charts/graphs where applicable
- Export/share options

### Additional Sections
- FAQ section (contextual to calculator)
- Related calculators
- Educational content
- Disclaimers

## Template Structure for Each Calculator

### File Structure
```
src/data/calculators/[country]/[calculatorType].js
src/locales/en/[country]-[calculatorType].json
```

### Calculator Data Structure
```javascript
{
  "id": "[country][calculatorType]",
  "name": "[Country] [Calculator Type]",
  "description": "Brief description of calculator purpose",

  "inputs": [
    // Mandatory inputs first
    {
      "id": "grossSalary",
      "label": "Gross Salary",
      "type": "number",
      "default": 50000,
      "unit": "currency",
      "required": true,
      "min": 0
    },
    // Optional inputs with conditions
    {
      "id": "includeOvertime",
      "label": "Include Overtime Pay",
      "type": "checkbox",
      "default": false
    },
    {
      "id": "overtimeHours",
      "label": "Overtime Hours per Week",
      "type": "number",
      "default": 0,
      "conditional": "includeOvertime"
    }
  ],

  "formula": {
    // Calculation formulas
  },

  "outputs": [
    // Result display configuration
  ],

  "examples": [
    // Test cases and expected results
  ]
}
```

### Content Structure (JSON)
```javascript
{
  "slug": "[country]-[calculatorType]",
  "type": "calculator",
  "h1": "[Country] [Calculator Type] - [Primary Keyword]",
  "metaTitle": "[Country] [Calculator Type] | [Description]",
  "metaDescription": "[Description with keywords]",

  "primaryKeyword": "[Primary Keyword]",
  "longTailKeywords": ["keyword1", "keyword2"],

  "intro": "Calculator introduction and purpose",

  "differentiationNotice": {
    "title": "Calculator Purpose",
    "message": "How this differs from other calculators",
    "links": [...]
  },

  "useCases": [...],
  "faqs": [...],
  "related": [...]
}
```

## Implementation Checklist

### For Each New Calculator:
- [ ] Create calculator data file
- [ ] Create content JSON file
- [ ] Add to calculator engine imports
- [ ] Update sitemap
- [ ] Test all input combinations
- [ ] Verify tax calculations
- [ ] Add to navigation
- [ ] Update related calculator links

### Quality Assurance:
- [ ] All mandatory inputs have validation
- [ ] Optional inputs properly conditional
- [ ] Formulas handle edge cases
- [ ] Results display correctly
- [ ] Mobile responsive
- [ ] SEO optimized
- [ ] Accessibility compliant

## Country-Specific Templates

### Ireland Template
**Tax Components**: PAYE (Progressive), USC, PRSI
**Currency**: EUR (€)
**Tax Year**: 2026
**Unique Features**: Progressive USC brackets, PRSI exemptions

### UK Template
**Tax Components**: PAYE, NIC (Class 1), Student Loan
**Currency**: GBP (£)
**Tax Year**: 2024/25
**Unique Features**: National Insurance thresholds, Student Loan plans

### USA Template
**Tax Components**: Federal Income Tax, State Tax, FICA (SS/Medicare)
**Currency**: USD ($)
**Tax Year**: 2025
**Unique Features**: State-specific tax rates, 401(k) calculations

## Maintenance Guidelines

### Adding New Calculators
1. Choose appropriate category and country
2. Follow template structure exactly
3. Include comprehensive test cases
4. Update all related links and navigation
5. Test on multiple devices/browsers

### Updating Tax Rates
1. Identify affected calculators
2. Update calculation functions in calculatorEngine.ts
3. Update test cases and examples
4. Update content to reflect new tax year
5. Test all affected calculators

### Adding New Features
1. Determine if feature is mandatory or optional
2. Update input classification system if needed
3. Modify template structure if required
4. Update all existing calculators consistently
5. Update documentation

This template system ensures consistency, maintainability, and scalability for all SalaryWise calculators.</content>
</xai:function_call">Write



