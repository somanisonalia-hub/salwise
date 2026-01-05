# Country Hub Page Template - SalaryWise.io

## Template for Creating New Country Hub Pages

### File Location
`src/locales/en/country/[country].json`

### JSON Structure Template

```json
{
  "slug": "country/[country]",
  "type": "guide",
  "h1": "[Country] Salary Calculators & Tools",
  "metaTitle": "[Country] Salary Calculators | Take-Home Pay, Tax & Overtime Tools | SalaryWise.io",
  "metaDescription": "Use the [Country] Salary Calculators to check take-home pay, taxes, overtime, bonuses, and contractor salaries. Accurate [country] [tax system] calculations.",
  "primaryKeyword": "[country] salary calculators",
  "longTailKeywords": [
    "[Country] salary calculator",
    "[country] tax calculator",
    "[Country] take home pay calculator",
    "[Country] overtime calculator",
    "[Country] bonus tax calculator"
  ],
  "related": [
    "[country]-salary-calculator",
    "salary-calculator",
    "gross-to-net-salary"
  ],
  "title": "[Country] Salary Calculators & Tools | SalaryWise.io",
  "description": "Complete [Country] salary toolkit: Calculate take-home pay, taxes, overtime, bonuses, and contractor earnings with accurate [country] [tax system] calculations.",
  "keywords": "[Country] salary calculators, [country] tax calculator, [Country] take home pay, [Country] overtime calculator, [Country] bonus tax calculator",
  "canonical": "https://salarywise.io/country/[country]",

  "header": {
    "title": "[Country] Salary Calculators & Tools",
    "subtitle": "Calculate your take-home pay, taxes, overtime, and contractor earnings in [Country]"
  },

  "intro": {
    "paragraph1": "This page helps users calculate [Country] salary, taxes, overtime, bonuses, and contractor earnings with our comprehensive toolkit of [Country] salary calculators. Whether you're comparing job offers, planning your budget, or understanding your take-home pay [country], our [country] tax calculator provides accurate estimates based on current [tax system] rates[add specific tax components].",
    "paragraph2": "All calculations follow official [government authority, e.g., Revenue.ie, HMRC, IRS] guidelines and include the latest tax brackets for [Country]."
  },

  "[country]Calculators": {
    "title": "[Country] Salary Calculators",
    "subtitle": "Specialized tools for [Country] employment and taxation",
    "calculators": [
      {
        "title": "[Country] Salary Calculator",
        "description": "Calculate take-home pay including [main tax components, e.g., PAYE, USC, PRSI]",
        "href": "/en/[country]-salary-calculator",
        "icon": "💰"
      },
      {
        "title": "[Country] Hourly to Salary",
        "description": "Convert hourly rates to annual salary with tax calculations",
        "href": "/en/[country]-hourly-to-salary",
        "icon": "⏰"
      },
      {
        "title": "[Country] Overtime Pay",
        "description": "Calculate overtime pay rates and tax implications",
        "href": "/en/[country]-overtime-pay",
        "icon": "📈"
      },
      {
        "title": "[Country] Bonus Tax",
        "description": "Calculate tax on bonuses and special payments",
        "href": "/en/[country]-bonus-tax",
        "icon": "🎁"
      },
      {
        "title": "[Country] Contractor Salary Calculator",
        "description": "Tax calculations for contractors and freelancers",
        "href": "/en/[country]-contractor-salary-calculator",
        "icon": "📋"
      }
    ]
  },

  "globalTools": {
    "title": "Global Salary Tools",
    "subtitle": "Compare [Country] salaries with international standards",
    "tools": [
      {
        "title": "Global Salary Calculator",
        "description": "Compare take-home pay across multiple countries",
        "href": "/en/salary-calculator",
        "icon": "🌍"
      },
      {
        "title": "Gross to Net Calculator",
        "description": "Convert gross salary to net take-home pay",
        "href": "/en/gross-to-net-salary",
        "icon": "📊"
      },
      {
        "title": "Take-Home Pay Calculator",
        "description": "Calculate net salary after all deductions",
        "href": "/en/take-home-pay-calculator",
        "icon": "💵"
      },
      {
        "title": "Salary After Tax Calculator",
        "description": "Estimate salary after tax calculations",
        "href": "/en/salary-after-tax-calculator",
        "icon": "🧾"
      }
    ]
  },

  "[country]TaxBasics": {
    "title": "[Country] Tax System Basics",
    "subtitle": "Understanding [main tax components, e.g., PAYE, USC, and Irish taxation]",
    "content": [
      {
        "heading": "[Main Tax 1, e.g., Income Tax]",
        "text": "[Detailed explanation of primary tax with brackets and examples. Include specific rates and thresholds.]"
      },
      {
        "heading": "[Main Tax 2, e.g., Social Insurance]",
        "text": "[Explanation of secondary tax/social contributions with rates and purposes.]"
      },
      {
        "heading": "[Additional Tax/Consideration]",
        "text": "[Any additional taxes, special considerations, or unique aspects of the tax system.]"
      },
      {
        "heading": "Common Scenarios",
        "text": "[Real examples with salary ranges and expected net amounts. Include variations based on circumstances.]"
      }
    ]
  },

  "helpfulGuides": {
    "title": "Helpful Guides",
    "subtitle": "Learn more about [Country] salaries and taxation",
    "guides": [
      {
        "title": "How to Calculate Take-Home Pay",
        "description": "Step-by-step guide to [Country] salary calculations",
        "href": "/en/how-to-calculate-take-home-pay"
      },
      {
        "title": "Salary Negotiation Tips",
        "description": "Strategies for negotiating better [Country] salaries",
        "href": "/en/guides/salary-negotiation-tips"
      },
      {
        "title": "Taxes Explained by Country",
        "description": "Compare [Country] tax system with other countries",
        "href": "/en/guides/taxes-explained-by-country"
      },
      {
        "title": "Gross vs Net Salary Guide",
        "description": "Understanding the difference between gross and net pay",
        "href": "/en/guides/gross-vs-net-salary"
      }
    ]
  }
}
```

## Implementation Checklist

### ✅ SEO Requirements
- [ ] H1: "[Country] Salary Calculators & Tools"
- [ ] Meta title under 60 characters
- [ ] Meta description under 160 characters
- [ ] Primary keyword in title, H1, and intro
- [ ] Long-tail keywords naturally integrated
- [ ] Canonical URL set correctly

### ✅ Content Structure
- [ ] Header section with clear title and subtitle
- [ ] 2-paragraph intro with natural keyword placement
- [ ] 5 country-specific calculators with icons and descriptions
- [ ] 4 global comparison tools
- [ ] 3-4 tax basics sections with specific details and examples
- [ ] 4 helpful guides linking to relevant resources

### ✅ Technical Requirements
- [ ] Only Phase 1 approved internal links
- [ ] Proper JSON syntax and formatting
- [ ] Consistent icon usage (💰💵📊 etc.)
- [ ] Country-specific tax information accuracy
- [ ] Mobile-responsive content structure

### ✅ User Experience
- [ ] Calculator access immediately visible
- [ ] Educational content flows naturally
- [ ] Clear visual hierarchy with H2 sections
- [ ] Action-oriented descriptions
- [ ] Value-focused content (not just filler)

## Country-Specific Replacements

### For UK:
- `[country]` → `uk`
- `[Country]` → `UK`
- `[tax system]` → `PAYE, NIC, and student loan`
- `[government authority]` → `HMRC`
- `[main tax components]` → `PAYE, National Insurance, student loans`
- `[Main Tax 1]` → `PAYE Income Tax`
- `[Main Tax 2]` → `National Insurance`
- `[Additional Tax]` → `Student Loans`

### For Ireland:
- `[country]` → `ireland`
- `[Country]` → `Ireland`
- `[tax system]` → `PAYE, USC, and PRSI`
- `[government authority]` → `Revenue.ie`
- `[main tax components]` → `PAYE, USC, and PRSI`
- `[Main Tax 1]` → `PAYE Income Tax`
- `[Main Tax 2]` → `Universal Social Charge`
- `[Additional Tax]` → `Pay Related Social Insurance`

### For USA:
- `[country]` → `usa`
- `[Country]` → `USA`
- `[tax system]` → `federal, state, and FICA`
- `[government authority]` → `IRS`
- `[main tax components]` → `federal tax, state tax, and FICA`
- `[Main Tax 1]` → `Federal Income Tax`
- `[Main Tax 2]` → `State Income Tax`
- `[Additional Tax]` → `FICA Taxes`

## Quick Copy Template

To create a new country hub page:

1. Copy this template file
2. Replace all `[country]`, `[Country]`, and tax-specific placeholders
3. Research and add accurate tax information
4. Update calculator descriptions with country-specific details
5. Ensure all links point to existing Phase 1 pages
6. Test the page loads correctly

## File Creation Steps

1. Create `src/locales/en/country/[country].json`
2. Copy template JSON structure
3. Replace placeholders with country-specific content
4. Add to available pages in `src/app/en/[slug]/page.tsx`
5. Test build and functionality
6. Update sitemap if needed

This template ensures consistency across all country hub pages while allowing for country-specific customization.



