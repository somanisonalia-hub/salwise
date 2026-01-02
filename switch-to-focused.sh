#!/bin/bash

echo "🔄 Switching all pages to focused, optimized versions..."
echo ""

# Switch main calculator pages
echo "📊 Switching calculator pages..."
cp src/app/salary-calculator/page-focused.tsx src/app/salary-calculator/page.tsx
cp src/app/gross-to-net/page-focused.tsx src/app/gross-to-net/page.tsx

# Switch country pages
echo "🌍 Switching country pages..."
cp src/app/country/usa/page-focused.tsx src/app/country/usa/page.tsx

# Switch guide pages
echo "📚 Switching guide pages..."
cp src/app/guides/gross-vs-net/page-focused.tsx src/app/guides/gross-vs-net/page.tsx

echo ""
echo "✅ All pages switched to focused versions!"
echo ""
echo "🎯 Key optimizations applied:"
echo "  • Compact design with efficient spacing"
echo "  • SEO-optimized with structured data"
echo "  • Mobile-first responsive design"
echo "  • Fast loading with minimal bundle"
echo "  • Touch-friendly interactions"
echo "  • Target-focused content"
echo ""
echo "🚀 Run 'npm run dev' to see the optimized pages!"
echo "📱 Test on mobile for the best experience!"

