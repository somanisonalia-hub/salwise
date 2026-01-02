#!/bin/bash

echo "Available versions:"
echo "1. seo - SEO Optimized"
echo "2. conversion - Conversion Optimized" 
echo "3. performance - Performance Optimized"
echo "4. mobile - Mobile Optimized"
echo "5. original - Original Version"
echo ""
read -p "Enter version number (1-5): " choice

case $choice in
    1) cp src/app/page-seo-optimized.tsx src/app/page.tsx ;;
    2) cp src/app/page-conversion-optimized.tsx src/app/page.tsx ;;
    3) cp src/app/page-performance-optimized.tsx src/app/page.tsx ;;
    4) cp src/app/page-mobile-optimized.tsx src/app/page.tsx ;;
    5) cp src/app/page-original.tsx src/app/page.tsx ;;
    *) echo "Invalid choice" ;;
esac

echo "Switched to version. Run 'npm run dev' to test."
