#!/bin/bash
# Daily link checker for SalaryWise.io
# Run with: ./check_links_daily.sh

LOG_FILE="link_check_$(date +%Y%m%d).log"
BASE_URL="http://localhost:3000"

echo "🔍 Daily Link Check - $(date)" > "$LOG_FILE"
echo "===================================" >> "$LOG_FILE"

# Get URLs from sitemap
URLS=$(grep "<loc>" out/sitemap.xml | sed 's|<loc>||;s|</loc>||' | sed "s|https://salarywise.io|$BASE_URL|g")

BROKEN_COUNT=0

# Check each page
while IFS= read -r page_url; do
    if [ -n "$page_url" ]; then
        page_name=$(echo "$page_url" | sed 's|http://localhost:3000||')
        
        # Get page content
        content=$(curl -s "$page_url" 2>/dev/null)
        
        if [ -z "$content" ]; then
            echo "❌ Cannot fetch: $page_name" >> "$LOG_FILE"
            continue
        fi
        
        # Extract href links
        links=$(echo "$content" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"//' | grep '^/' | sort | uniq)
        
        # Check each link
        while IFS= read -r link; do
            if [ -n "$link" ]; then
                full_url="$BASE_URL$link"
                status=$(curl -s -o /dev/null -w "%{http_code}" "$full_url" 2>/dev/null)
                
                if [ "$status" = "404" ]; then
                    echo "❌ BROKEN: $page_name -> $link" >> "$LOG_FILE"
                    ((BROKEN_COUNT++))
                fi
            fi
        done <<< "$links"
    fi
done <<< "$URLS"

echo "" >> "$LOG_FILE"
echo "SUMMARY:" >> "$LOG_FILE"
echo "Pages scanned: $(echo "$URLS" | wc -l)" >> "$LOG_FILE"
echo "Broken links: $BROKEN_COUNT" >> "$LOG_FILE"

if [ $BROKEN_COUNT -eq 0 ]; then
    echo "🎉 All links working!" >> "$LOG_FILE"
else
    echo "⚠️  Broken links found!" >> "$LOG_FILE"
fi

echo "Log saved to: $LOG_FILE"
cat "$LOG_FILE"
