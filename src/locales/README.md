# Multi-File JSON Structure for SalaryWise.io

## Overview

This structure replaces the single large JSON files with manageable, scalable files per page/calculator for easy i18n support.

## Directory Structure

```
src/
├── locales/
│   ├── en/                    # English (default)
│   │   ├── salary-calculator.json
│   │   ├── gross-to-net.json
│   │   ├── net-to-gross.json
│   │   ├── take-home-pay.json
│   │   ├── hourly-to-salary.json
│   │   ├── bonus-calculator.json
│   │   ├── overtime-pay.json
│   │   │   ├── country/
│   │   │   │   ├── usa.json
│   │   │   │   ├── uk.json
│   │   │   │   ├── canada.json
│   │   │   │   ├── australia.json
│   │   │   │   ├── india.json
│   │   │   │   ├── ireland.json
│   │   │   │   ├── germany.json
│   │   │   │   ├── france.json
│   │   │   │   ├── spain.json
│   │   │   │   ├── singapore.json
│   │   │   │   ├── netherlands.json
│   │   │   │   ├── sweden.json
│   │   │   │   ├── switzerland.json
│   │   │   │   ├── new-zealand.json
│   │   │   │   └── south-africa.json
│   │   │   ├── industry/
│   │   │   │   ├── it.json
│   │   │   │   ├── finance.json
│   │   │   │   ├── healthcare.json
│   │   │   │   ├── engineering.json
│   │   │   │   ├── marketing.json
│   │   │   │   └── education.json
│   │   │   └── guides/
│   │   │       ├── gross-vs-net.json
│   │   │       ├── how-to-calculate-take-home.json
│   │   │       ├── salary-negotiation.json
│   │   │       ├── taxes-explained-by-country.json
│   │   │       └── salary-trends-2026.json
│   │   └── calculators/      # Page-specific calculator config
│   │       ├── salary-calculator.json
│   │       ├── gross-to-net.json
│   │       ├── net-to-gross.json
│   │       ├── take-home-pay.json
│   │       ├── hourly-to-salary.json
│   │       ├── bonus-calculator.json
│   │       └── overtime-pay.json
│   ├── es/                    # Spanish (future)
│   │   ├── pages/
│   │   │   ├── salary-calculator.json
│   │   │   └── ... (translated versions)
│   │   └── calculators/
│   │       └── ... (translated versions)
│   └── fr/                    # French (future)
│       ├── pages/
│       └── calculators/
└── data/
    └── calculators/           # Calculator formulas & logic (language-agnostic)
        ├── globalSalary.json
        ├── grossToNet.json
        ├── netToGross.json
        ├── takeHomePay.json
        ├── hourlyToSalary.json
        ├── bonusCalculator.json
        ├── overtimePay.json
        ├── usaSalary.json
        ├── ukSalary.json
        ├── canadaSalary.json
        └── ... (country-specific calculators)
```

## File Types Explained

### 1. Page Files (`src/locales/{locale}/pages/`)
- **Purpose**: SEO content, UI text, FAQs, tips
- **Size**: Small (2-5KB each)
- **Content**: Human-readable text that needs translation
- **Example**: `salary-calculator.json`

### 2. Calculator Config Files (`src/locales/{locale}/calculators/`)
- **Purpose**: Input labels, descriptions, help text
- **Size**: Very small (1-2KB each)
- **Content**: Form labels and user-facing text
- **Example**: Calculator input field labels in different languages

### 3. Calculator Data Files (`src/data/calculators/`)
- **Purpose**: Formulas, calculations, business logic
- **Size**: Medium (2-4KB each)
- **Content**: Language-agnostic (numbers, formulas, IDs)
- **Never translated**: These are the same in all languages

## Implementation Benefits

### ✅ Performance
- Load only current page's JSON (not entire site)
- Smaller files = faster parsing
- Better caching strategies

### ✅ Maintainability
- Update one page without affecting others
- Easy to add new pages
- Clear separation of concerns

### ✅ i18n Ready
- Add `/es` or `/fr` by copying and translating
- No structural changes needed
- Easy to track missing translations

### ✅ Error Isolation
- One broken JSON file only affects one page
- Easier debugging and deployment
- Graceful fallbacks possible

## Usage in Next.js

```typescript
// In a page component
import pageData from '../../locales/en/pages/salary-calculator.json';
import calculatorData from '../../data/calculators/globalSalary.json';

// For i18n (future)
const locale = 'es'; // from router or context
const pageData = require(`../../locales/${locale}/pages/salary-calculator.json`);
const calculatorData = require(`../../data/calculators/globalSalary.json`); // same for all locales
```

## Migration from Current Structure

Current: 2 large files
- `src/data/pages.json` (150KB+)
- `src/data/calculators.json` (100KB+)

New: 40+ small files
- 30+ page files (2-5KB each)
- 10+ calculator data files (2-4KB each)
- Total: Much smaller individual files, better performance

## Adding New Languages

1. Copy `src/locales/en/` to `src/locales/{new-locale}/`
2. Translate text content in JSON files
3. Formulas and calculations stay the same
4. Update routing logic to load correct locale

This structure scales perfectly for 50+ languages and 100+ pages!
