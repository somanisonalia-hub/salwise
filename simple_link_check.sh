#!/bin/bash

echo "🔍 SalaryWise.io Link Checker"
echo "============================"

BASE_URL="http://localhost:3000"
BROKEN_COUNT=0
TOTAL_PAGES=0

# Get URLs from sitemap
URLS=$(grep "<loc>" out/sitemap.xml | sed 's|<loc>||;s|</loc>||' | sed "s|https://salarywise.io|$BASE_URL|g")

echo "Found $(echo "$URLS" | wc -l) pages to check"
echo

# Check each page
echo "$URLS" | while read -r page_url; do
    if [ -n "$page_url" ]; then
        ((TOTAL_PAGES++))
        echo "📄 Checking: $(echo $page_url | sed 's|http://localhost:3000||')"
        
        # Get page content
        content=$(curl -s "$page_url" 2>/dev/null)
        
        if [ -z "$content" ]; then
            echo "❌ Cannot fetch page: $page_url"
            continue
        fi
        
        # Extract href links
        links=$(echo "$content" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"//' | grep '^/' | sort | uniq)
        
        echo "   Found $(echo "$links" | wc -l) internal links"
        
        # Check each link
        echo "$links" | while read -r link; do
            if [ -n "$link" ]; then
                full_url="$BASE_URL$link"
                status=$(curl -s -o /dev/null -w "%{http_code}" "$full_url" 2>/dev/null)
                
                if [ "$status" = "404" ]; then
                    echo "   ❌ BROKEN: $link"
                    ((BROKEN_COUNT++))
                fi
            fi
        done
        
        echo "   ✓ Page checked"
        echo
    fi
done

echo "============================"
echo "SUMMARY:"
echo "Pages checked: $TOTAL_PAGES"
echo "Broken links: $BROKEN_COUNT"

if [ $BROKEN_COUNT -eq 0 ]; then
    echo "🎉 All links working!"
else
    echo "⚠️  Found broken links!"
fi
