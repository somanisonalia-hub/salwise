#!/bin/bash

echo "🔍 COMPREHENSIVE LINK CHECKER - SalaryWise.io"
echo "=============================================="
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"
TOTAL_PAGES=0
TOTAL_LINKS=0
BROKEN_LINKS=0
WORKING_LINKS=0

# Function to check if a URL returns 404
check_link() {
    local url="$1"
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$status_code" = "404" ]; then
        echo -e "${RED}❌ BROKEN${NC}: $url (404)"
        ((BROKEN_LINKS++))
        return 1
    elif [ "$status_code" = "200" ] || [ "$status_code" = "301" ] || [ "$status_code" = "302" ]; then
        echo -e "${GREEN}✅ OK${NC}: $url ($status_code)"
        ((WORKING_LINKS++))
        return 0
    else
        echo -e "${YELLOW}⚠️  OTHER${NC}: $url ($status_code)"
        ((WORKING_LINKS++))
        return 0
    fi
}

# Function to extract and check links from a page
check_page_links() {
    local page_url="$1"
    local page_name=$(echo "$page_url" | sed 's|http://localhost:3000||')
    
    echo
    echo -e "${BLUE}📄 Checking page: $page_name${NC}"
    echo "─".repeat(50)
    
    # Get the page content and extract href links
    local page_content=$(curl -s "$page_url" 2>/dev/null)
    
    if [ -z "$page_content" ]; then
        echo -e "${RED}❌ FAILED to fetch page: $page_url${NC}"
        return
    fi
    
    # Extract all href links (internal links only)
    local links=$(echo "$page_content" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//' | grep '^/' | sort | uniq)
    
    local page_link_count=0
    local page_broken_count=0
    
    echo "Found $(echo "$links" | wc -l) internal links"
    
    while IFS= read -r link; do
        if [ -n "$link" ]; then
            ((page_link_count++))
            ((TOTAL_LINKS++))
            
            # Convert relative links to absolute URLs
            if [[ $link == /* ]]; then
                full_url="$BASE_URL$link"
            else
                full_url="$link"
            fi
            
            # Only check internal links
            if [[ $full_url == http://localhost:3000* ]]; then
                if ! check_link "$full_url"; then
                    ((page_broken_count++))
                fi
            fi
        fi
    done <<< "$links"
    
    echo -e "${BLUE}📊 Page Summary: $page_link_count links checked, $page_broken_count broken${NC}"
}

# Get all URLs from sitemap
echo "📋 Reading sitemap.xml..."
SITEMAP_URLS=$(grep "<loc>" out/sitemap.xml | sed 's|<loc>||;s|</loc>||' | sed "s|https://salarywise.io|$BASE_URL|g")

echo "Found $(echo "$SITEMAP_URLS" | wc -l) pages in sitemap"
echo

# Process each page from sitemap
while IFS= read -r page_url; do
    if [ -n "$page_url" ]; then
        ((TOTAL_PAGES++))
        check_page_links "$page_url"
        
        # Add a small delay to avoid overwhelming the server
        sleep 0.1
    fi
done <<< "$SITEMAP_URLS"

# Final summary
echo
echo "=============================================="
echo -e "${BLUE}🎯 FINAL SUMMARY${NC}"
echo "=============================================="
echo "📄 Total pages checked: $TOTAL_PAGES"
echo "🔗 Total links checked: $TOTAL_LINKS"
echo -e "${GREEN}✅ Working links: $WORKING_LINKS${NC}"
echo -e "${RED}❌ Broken links: $BROKEN_LINKS${NC}"

if [ $BROKEN_LINKS -eq 0 ]; then
    echo -e "${GREEN}🎉 SUCCESS: All links are working!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  WARNING: $BROKEN_LINKS broken links found!${NC}"
    exit 1
fi
