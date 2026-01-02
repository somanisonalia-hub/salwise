#!/bin/bash

echo "🔍 SalaryWise.io Broken Link Scanner"
echo "===================================="

BASE_URL="http://localhost:3000"
BROKEN_LINKS=()

# Get URLs from sitemap
URLS=$(grep "<loc>" out/sitemap.xml | sed 's|<loc>||;s|</loc>||' | sed "s|https://salarywise.io|$BASE_URL|g")

echo "Scanning $(echo "$URLS" | wc -l) pages for broken links..."
echo

# Check each page
page_count=0
while IFS= read -r page_url; do
    if [ -n "$page_url" ]; then
        ((page_count++))
        page_name=$(echo "$page_url" | sed 's|http://localhost:3000||')
        
        # Get page content
        content=$(curl -s "$page_url" 2>/dev/null)
        
        if [ -z "$content" ]; then
            echo "❌ Cannot fetch: $page_name"
            continue
        fi
        
        # Extract href links (internal only)
        links=$(echo "$content" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"//' | grep '^/' | sort | uniq)
        
        # Check each link for 404
        while IFS= read -r link; do
            if [ -n "$link" ]; then
                full_url="$BASE_URL$link"
                status=$(curl -s -o /dev/null -w "%{http_code}" "$full_url" 2>/dev/null)
                
                if [ "$status" = "404" ]; then
                    BROKEN_LINKS+=("$page_name -> $link")
                    echo "❌ BROKEN: $page_name -> $link"
                fi
            fi
        done <<< "$links"
        
        # Progress indicator
        if [ $((page_count % 10)) -eq 0 ]; then
            echo "✓ Checked $page_count pages..."
        fi
    fi
done <<< "$URLS"

echo
echo "===================================="
echo "RESULTS:"
echo "Pages scanned: $page_count"
echo "Broken links found: ${#BROKEN_LINKS[@]}"

if [ ${#BROKEN_LINKS[@]} -eq 0 ]; then
    echo "🎉 SUCCESS: No broken links found!"
else
    echo "⚠️  BROKEN LINKS:"
    for broken in "${BROKEN_LINKS[@]}"; do
        echo "   $broken"
    done
fi
