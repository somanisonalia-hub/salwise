#!/bin/bash

# Extract URLs from sitemap and check for corresponding JSON files
echo "Checking sitemap URLs against JSON files (v2)..."
echo

# List of URLs from sitemap (without domain and /en/)
urls=(
    ""  # homepage -> page.json
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
    "salary-calculator-usa"
    "salary-calculator-uk"
    "salary-calculator-ireland"
    "salary-calculator-canada"
    "salary-calculator-australia"
    "salary-calculator-germany"
    "salary-calculator-france"
    "salary-calculator-spain"
    "salary-calculator-india"
    "salary-calculator-singapore"
    "salary-calculator-netherlands"
    "salary-calculator-sweden"
    "salary-calculator-switzerland"
    "salary-calculator-new-zealand"
    "salary-calculator-south-africa"
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
    "country"  # -> countries/index.json
    "industry"  # -> industry/index.json
    "guides"  # -> guides/index.json
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
    elif [ "$url" = "country" ]; then
        json_file="countries/index.json"
    elif [ "$url" = "industry" ]; then
        json_file="industry/index.json"
    elif [ "$url" = "guides" ]; then
        json_file="guides/index.json"
    else
        json_file="${url}.json"
    fi
    
    if [ -f "src/locales/en/$json_file" ]; then
        echo "✅ $url -> $json_file - FOUND"
        ((found++))
    else
        echo "❌ $url -> $json_file - MISSING"
        ((missing++))
    fi
done

echo
echo "Summary:"
echo "Found: $found"
echo "Missing: $missing"
echo "Total: $((found + missing))"
