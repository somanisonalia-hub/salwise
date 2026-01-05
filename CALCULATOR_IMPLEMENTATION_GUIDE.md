# SalaryWise Calculator Implementation Guide

## 🎯 **Complete Template System for All Calculators**

This guide provides Cursor with everything needed to create, maintain, and scale all SalaryWise calculators consistently.

---

## 📋 **Step 1: Calculator Categories Overview**

### **Ireland Calculators (5)**
| Calculator | File | Status |
|------------|------|--------|
| Salary Calculator | `ireland-salary-calculator` | ✅ Complete |
| Hourly to Salary | `ireland-hourly-to-salary` | ✅ Complete |
| Overtime Pay | `ireland-overtime-pay` | ✅ Complete |
| Bonus Tax | `ireland-bonus-tax` | ✅ Complete |
| Contractor Salary | `ireland-contractor-salary-calculator` | ✅ Complete |

### **UK Calculators (5)**
| Calculator | File | Status |
|------------|------|--------|
| Salary Calculator | `uk-salary-calculator` | ✅ Complete |
| Hourly to Salary | `uk-hourly-to-salary` | ✅ Complete |
| Overtime Pay | `uk-overtime-pay` | ✅ Complete |
| Bonus Tax | `uk-bonus-tax` | ✅ Complete |
| Contractor Salary | `uk-contractor-salary-calculator` | ✅ Complete |

### **USA Calculators (5)**
| Calculator | File | Status |
|------------|------|--------|
| Salary Calculator | `usa-salary-calculator` | ✅ Complete |
| Hourly to Salary | `usa-hourly-to-salary` | ✅ Complete |
| Overtime Pay | `usa-overtime-pay` | ✅ Complete |
| Bonus Tax | `usa-bonus-tax` | ✅ Complete |
| Contractor Salary | `usa-contractor-salary-calculator` | ✅ Complete |

### **Global Calculators (4)**
| Calculator | File | Status |
|------------|------|--------|
| Salary Calculator | `salary-calculator` | ✅ Complete |
| Gross to Net Salary | `gross-to-net-salary` | ✅ Complete |
| Take Home Pay | `take-home-pay-calculator` | ✅ Complete |
| Salary After Tax | `salary-after-tax-calculator` | ✅ Complete |

---

## 🏗️ **Step 2: Implementation Template Structure**

### **File Structure for Each Calculator**
```
src/
├── data/calculators/
│   └── [country]-[calculator].js          # Calculator logic & formulas
├── locales/en/
│   └── [country]-[calculator].json        # Content & SEO data
└── components/
    └── EnhancedCalculator.tsx             # Shared UI component
```

### **Calculator Data File Structure** (`[country]-[calculator].js`)
```javascript
const calculatorData = {
  "id": "[country][CalculatorType]",
  "name": "[Country] [Calculator Type]",
  "description": "Brief purpose description",

  "inputs": [
    // Mandatory inputs first (always visible)
    {
      "id": "grossSalary",
      "label": "Gross Salary",
      "type": "number",
      "default": 50000,
      "required": true
    },
    // Optional inputs (conditional visibility)
    {
      "id": "showAdvanced",
      "label": "Show Advanced Options",
      "type": "checkbox",
      "default": false
    },
    {
      "id": "overtimeHours",
      "label": "Overtime Hours",
      "type": "number",
      "conditional": "showAdvanced"
    }
  ],

  "formula": {
    // Calculation formulas
    "result": "input1 * input2 + input3"
  },

  "outputs": [
    // Result display configuration
    {"id": "result", "label": "Final Result", "unit": "currency"}
  ],

  "examples": [
    // Test cases
    {
      "inputs": {"input1": 100, "input2": 2},
      "expected": {"result": 200}
    }
  ]
};

export default calculatorData;
```

### **Content File Structure** (`[country]-[calculator].json`)
```javascript
{
  "slug": "[country]-[calculator]",
  "type": "calculator",
  "h1": "[Country] [Calculator] - [Primary Keyword]",
  "metaTitle": "[SEO Title]",
  "metaDescription": "[SEO Description]",

  "primaryKeyword": "[Primary Keyword]",
  "longTailKeywords": ["keyword1", "keyword2"],

  "intro": "Calculator introduction",

  "differentiationNotice": {
    "title": "Purpose",
    "message": "How this differs from others",
    "links": [...]
  },

  "useCases": [...],
  "faqs": [...],
  "related": [...]
}
```

---

## 🎨 **Step 3: UI Layout Standard**

### **Header Section**
```
[Flag] [Country] [Calculator Type]
Example: 🇮🇪 Ireland Salary Calculator
```

### **Input Sections**
1. **Mandatory Inputs** (always visible)
   - Required fields marked with `*`
   - Validation feedback
   - Default values

2. **Optional Inputs** (toggle visibility)
   - Hidden by default
   - "Show Advanced Options" checkbox
   - Conditional fields appear based on selections

### **Calculate Button**
- Text: `Calculate [Country] [Calculator]`
- Loading state during calculation
- Error handling for missing required fields

### **Results Section**
- Clean table layout
- Key metrics prominently displayed
- Tax breakdown components
- Visual charts where applicable

---

## 🔧 **Step 4: Implementation Checklist**

### **For Each New Calculator:**
- [ ] Create `src/data/calculators/[country]-[calculator].js`
- [ ] Create `src/locales/en/[country]-[calculator].json`
- [ ] Add import to `src/lib/calculatorEngine.ts`
- [ ] Add to `calculatorsData` array
- [ ] Update `src/app/sitemap.ts`
- [ ] Test all input combinations
- [ ] Verify tax calculations
- [ ] Update navigation links
- [ ] Add to related calculators

### **Quality Assurance:**
- [ ] All mandatory inputs validated
- [ ] Optional inputs properly conditional
- [ ] Formulas handle edge cases
- [ ] Results display correctly
- [ ] Mobile responsive
- [ ] SEO optimized
- [ ] Accessibility compliant

---

## 📊 **Step 5: Country-Specific Templates**

### **Ireland Template Features**
- **Currency**: EUR (€)
- **Tax Components**: PAYE (20/40/48%), USC (0.5-8%), PRSI (4%)
- **Unique**: Progressive brackets, social insurance

### **UK Template Features**
- **Currency**: GBP (£)
- **Tax Components**: PAYE (20/40/45%), NIC (8/12%), Student Loans
- **Unique**: National Insurance thresholds, Scottish rates

### **USA Template Features**
- **Currency**: USD ($)
- **Tax Components**: Federal (7 brackets), State (varies), FICA (7.65%)
- **Unique**: State-specific rates, 401(k), filing status

---

## 🚀 **Step 6: Usage Instructions for Cursor**

### **Creating a New Calculator:**
1. **Choose template** based on country and type
2. **Copy template structure** from appropriate JSON file
3. **Customize inputs** according to calculator requirements
4. **Implement formulas** in calculator data file
5. **Add tax calculations** using existing functions
6. **Create content** following SEO guidelines
7. **Test thoroughly** with multiple scenarios
8. **Update navigation** and related links

### **Maintaining Existing Calculators:**
1. **Update tax rates** annually using official government data
2. **Test all scenarios** after changes
3. **Update examples** with current rates
4. **Verify SEO content** remains relevant
5. **Check mobile responsiveness**

### **Adding New Features:**
1. **Determine scope** (mandatory vs optional)
2. **Update templates** if needed
3. **Implement consistently** across all calculators
4. **Test thoroughly** on all affected calculators
5. **Update documentation**

---

## 📁 **Step 7: File References**

### **Template Files Created:**
- `CALCULATOR_TEMPLATE_SYSTEM.md` - Complete system overview
- `IRELAND_CALCULATOR_TEMPLATE.json` - Ireland-specific template
- `UK_CALCULATOR_TEMPLATE.json` - UK-specific template
- `USA_CALCULATOR_TEMPLATE.json` - USA-specific template
- `CALCULATOR_IMPLEMENTATION_GUIDE.md` - This implementation guide

### **Key Code Files:**
- `src/components/EnhancedCalculator.tsx` - UI component
- `src/lib/calculatorEngine.ts` - Calculation engine
- `src/app/en/[slug]/page.tsx` - Page routing
- `src/app/sitemap.ts` - SEO sitemap

---

## 🎯 **Ready for Implementation**

Cursor now has:
- ✅ **Complete categorization** of all 19 calculators
- ✅ **Structured templates** for each country
- ✅ **Input classification system** (mandatory/optional)
- ✅ **UI layout standards**
- ✅ **Implementation checklists**
- ✅ **Quality assurance guidelines**
- ✅ **File structure templates**
- ✅ **Country-specific features**

Use this system to consistently create, maintain, and scale all SalaryWise calculators! 🚀</content>
</xai:function_call">Write



