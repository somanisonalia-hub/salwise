#!/bin/bash

# Extract URLs from sitemap and check for corresponding JSON files
echo "Checking sitemap URLs against JSON files..."
echo

# List of URLs from sitemap (without domain and /en/)
urls=(
    ""  # homepage
    "salary-calculator"
    "hourly-to-salary-calculator"
    "gross-to-net-salary"
    "net-to-gross-salary"
    "overtime-pay-calculator"
    "bonus-calculator"
    "take-home-pay-calculator"
    "loan-emi-calculator"
    "salary-vs-expenses-calculator"
    "annual-raise-promotion-calculator"
    "salary-vs-freelance-income-calculator"
    "savings-from-salary-calculator"
    "retirement-contribution-calculator"
    "salary-after-tax-usa"
    "salary-after-tax-uk"
    "salary-after-tax-ireland"
    "salary-after-tax-canada"
    "salary-after-tax-australia"
    "salary-after-tax-germany"
    "salary-after-tax-france"
    "salary-after-tax-spain"
    "salary-after-tax-india"
    "salary-after-tax-singapore"
    "salary-after-tax-netherlands"
    "salary-after-tax-sweden"
    "salary-after-tax-switzerland"
    "salary-after-tax-new-zealand"
    "salary-after-tax-south-africa"
    "salary-calculator-it-tech"
    "salary-calculator-healthcare"
    "salary-calculator-engineering"
    "salary-calculator-teacher"
    "salary-calculator-finance-banking"
    "salary-calculator-retail"
    "salary-calculator-construction"
    "salary-calculator-legal"
    "salary-calculator-marketing-sales"
    "salary-calculator-startup-entrepreneur"
    "understanding-gross-vs-net-salary"
    "salary-negotiation-tips"
    "how-to-calculate-take-home-pay"
    "taxes-explained-by-country"
    "salary-trends-2026-global"
    "country"
    "industry"
    "guides"
    "about"
    "contact"
    "privacy-policy"
    "terms-of-service"
    "disclaimer"
    "faq"
    "how-salary-calculators-work"
    "salary-guide"
    "cookies"
)

echo "Checking ${#urls[@]} URLs..."
echo

missing=0
found=0

for url in "${urls[@]}"; do
    if [ -z "$url" ]; then
        json_file="page.json"
    else
        json_file="${url}.json"
    fi
    
    if [ -f "src/locales/en/$json_file" ]; then
        echo "✅ $json_file - FOUND"
        ((found++))
    else
        echo "❌ $json_file - MISSING"
        ((missing++))
    fi
done

echo
echo "Summary:"
echo "Found: $found"
echo "Missing: $missing"
echo "Total: $((found + missing))"
