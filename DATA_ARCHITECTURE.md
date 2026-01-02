# 📊 SalaryWise.io Data Architecture

This document outlines the comprehensive data architecture for SalaryWise.io, featuring a JSON-driven approach for pages, calculators, and SEO optimization.

## 🏗️ Architecture Overview

SalaryWise.io uses a **data-driven architecture** with three core JSON files:

1. **`pages.json`** - Page metadata, SEO, and content structure
2. **`calculators.json`** - Calculator configurations and formulas
3. **`countries.json`** - Country-specific tax rules and data
4. **`industries.json`** - Industry-specific salary data
5. **`guides.json`** - Educational content and guides

## 📄 Pages Structure (`pages.json`)

### Schema
```typescript
interface PageData {
  slug: string;              // URL path
  type: 'calculator' | 'guide';
  h1: string;                // Main heading
  metaTitle: string;         // SEO title tag
  metaDescription: string;   // SEO description
  primaryKeyword: string;    // Main target keyword
  longTailKeywords: string[]; // Long-tail keywords array
  related: string[];         // Related page slugs
  dataRef: string;           // Reference to calculator/guide data
}
```

### Example Entry
```json
{
  "slug": "salary-calculator",
  "type": "calculator",
  "h1": "Salary Calculator",
  "metaTitle": "Salary Calculator – Calculate Your Salary Instantly",
  "metaDescription": "Use our free salary calculator...",
  "primaryKeyword": "salary calculator",
  "longTailKeywords": [
    "online salary calculator",
    "calculate your salary",
    "free salary calculator"
  ],
  "related": ["gross-to-net", "take-home-pay", "hourly-to-salary"],
  "dataRef": "globalSalary"
}
```

## 🧮 Calculators Structure (`calculators.json`)

### Schema
```typescript
interface Calculator {
  id: string;                    // Unique identifier (matches dataRef)
  name: string;                  // Display name
  inputs: CalculatorInput[];     // Input configuration
  formula: CalculatorFormula;    // Calculation formulas
}

interface CalculatorInput {
  id: string;                    // Input identifier
  label: string;                 // Display label
  type: 'number' | 'text' | 'select';
  default: number | string;      // Default value
  unit?: string;                 // Unit symbol ($, %, hours, etc.)
}

interface CalculatorFormula {
  [resultKey: string]: string;   // Formula expressions
}
```

### Example Calculator
```json
{
  "id": "grossToNet",
  "name": "Gross to Net Salary Calculator",
  "inputs": [
    {
      "id": "grossSalary",
      "label": "Gross Salary",
      "type": "number",
      "default": 60000,
      "unit": "$"
    },
    {
      "id": "taxRate",
      "label": "Tax Rate (%)",
      "type": "number",
      "default": 25,
      "unit": "%"
    }
  ],
  "formula": {
    "netSalary": "grossSalary * (1 - taxRate/100)"
  }
}
```

## 🔧 Calculator Engine

The `calculatorEngine.ts` provides safe formula evaluation:

```typescript
import { calculateResults } from './lib/calculatorEngine';

// Calculate results for a given calculator
const results = calculateResults('grossToNet', {
  grossSalary: 60000,
  taxRate: 25
});
// Returns: { netSalary: 45000 }
```

### Supported Operations
- Basic arithmetic: `+`, `-`, `*`, `/`
- Mathematical functions: `Math.*` (when needed)
- Variable references: `grossSalary`, `taxRate`, etc.
- Safe evaluation with error handling

## 🚀 Usage Examples

### 1. Dynamic Page Generation
```typescript
// pages/[...slug].tsx
import { findPageBySlug, getPageCalculator } from '../lib/pageGenerator';

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/');
  const page = findPageBySlug(slug);
  const calculator = getPageCalculator(slug);

  return { props: { page, calculator } };
}
```

### 2. Calculator Integration
```typescript
// In your React component
import { useState } from 'react';
import { calculateResults } from '../lib/calculatorEngine';

function CalculatorComponent({ calculator }) {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});

  const handleCalculate = () => {
    const calculationResults = calculateResults(calculator.id, inputs);
    setResults(calculationResults);
  };

  return (
    <div>
      {calculator.inputs.map(input => (
        <input
          key={input.id}
          type={input.type}
          placeholder={`${input.label} (${input.unit})`}
          value={inputs[input.id] || input.default}
          onChange={(e) => setInputs({...inputs, [input.id]: e.target.value})}
        />
      ))}
      <button onClick={handleCalculate}>Calculate</button>

      {Object.entries(results).map(([key, value]) => (
        <div key={key}>{key}: {value}</div>
      ))}
    </div>
  );
}
```

### 3. SEO Data Integration
```typescript
import { getPageSEOData, generateCalculatorStructuredData } from '../lib/pageGenerator';

// Get SEO metadata
const seoData = getPageSEOData('salary-calculator');
// Returns: { title, description, keywords, h1 }

// Get structured data for rich snippets
const structuredData = generateCalculatorStructuredData('salary-calculator');
```

## 📊 Data Relationships

```
pages.json (dataRef) → calculators.json (id)
                    → countries.json (id)
                    → industries.json (id)
                    → guides.json (id)
```

## 🔍 SEO Features

### Keyword Targeting
- **Primary Keywords**: Main search terms (e.g., "salary calculator")
- **Long-tail Keywords**: Specific queries (e.g., "calculate net salary from gross")
- **Total Coverage**: 80+ keywords across all pages

### Meta Optimization
- Dynamic title generation
- Description optimization (150-160 characters)
- Keyword-rich content structure
- Schema.org structured data

## 🛠️ Utility Functions

### Page Management
```typescript
import {
  findPageBySlug,           // Get page by slug
  getRelatedPages,          // Get related pages
  getCalculatorPages,       // Get all calculator pages
  searchPagesByKeyword      // Search pages by keyword
} from './lib/pageGenerator';
```

### Calculator Operations
```typescript
import {
  calculateResults,         // Evaluate calculator formulas
  getCalculator,            // Get calculator config
  validateCalculatorInputs, // Validate inputs
  formatCurrency            // Format currency values
} from './lib/calculatorEngine';
```

## 📈 Benefits

### 🎯 SEO Advantages
- **Comprehensive Keyword Coverage**: Primary + long-tail targeting
- **Structured Data**: Rich snippets for calculators
- **Internal Linking**: Strategic cross-linking for SEO value
- **Dynamic Meta Tags**: Optimized titles and descriptions

### 🔧 Developer Benefits
- **Data-Driven**: Easy to add new calculators and pages
- **Type Safety**: Full TypeScript support
- **Modular Architecture**: Separated concerns (pages, calculators, SEO)
- **Scalable**: Easy to extend with new countries, industries, calculators

### 🚀 Performance Benefits
- **Static Generation**: Pre-built pages for speed
- **Optimized Bundles**: Code splitting and lazy loading
- **Efficient Formulas**: Safe mathematical evaluation
- **Caching Ready**: CDN-friendly architecture

## 🎯 Implementation Checklist

- ✅ Pages metadata and SEO structure
- ✅ Calculator configurations and formulas
- ✅ Country-specific tax calculators
- ✅ Industry-specific salary data
- ✅ Guide content structure
- ✅ Calculator engine with safe evaluation
- ✅ Page generator utilities
- ✅ SEO optimization features
- ✅ TypeScript type definitions
- ✅ Dynamic page generation ready

## 📝 Adding New Content

### New Calculator
1. Add calculator config to `calculators.json`
2. Add page metadata to `pages.json` (with matching `dataRef`)
3. Update related pages if needed
4. Test with calculator engine

### New Country/Industry
1. Add data to respective JSON files
2. Create page entry in `pages.json`
3. Add to related calculators
4. Update internal linking

### New Guide
1. Add content to `guides.json`
2. Add page metadata to `pages.json`
3. Link from related calculators

---

**Ready for dynamic page generation!** 🚀

This architecture supports 50+ pages with full SEO optimization, calculator functionality, and scalable content management.
