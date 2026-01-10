const fs = require('fs');
const path = require('path');

// Schema validation script for SalaryWise.io
// This script validates the structured data markup

console.log('🔍 Schema Validation for SalaryWise.io\n');

// Check if development server is running
console.log('📋 Prerequisites:');
console.log('1. Make sure development server is running: npm run dev');
console.log('2. Visit these URLs to validate schema markup:');
console.log('');

const validationUrls = [
  {
    url: 'http://localhost:3000/en/',
    expectedSchemas: ['WebSite', 'Organization', 'BreadcrumbList'],
    description: 'Homepage - WebSite and Organization schema'
  },
  {
    url: 'http://localhost:3000/en/ireland-salary-calculator',
    expectedSchemas: ['SoftwareApplication', 'WebPage', 'Organization', 'BreadcrumbList'],
    description: 'Calculator Page - SoftwareApplication schema'
  },
  {
    url: 'http://localhost:3000/en/understanding-gross-vs-net-salary',
    expectedSchemas: ['Article', 'WebPage', 'Organization', 'BreadcrumbList'],
    description: 'Guide Page - Article schema'
  },
  {
    url: 'http://localhost:3000/en/faq',
    expectedSchemas: ['FAQPage', 'WebPage', 'Organization', 'BreadcrumbList'],
    description: 'FAQ Page - FAQPage schema'
  }
];

// Online validation tools
console.log('🛠️  Online Schema Validation Tools:');
console.log('');
console.log('1. Google Rich Results Test:');
console.log('   https://search.google.com/test/rich-results');
validationUrls.forEach(page => {
  console.log(`   - ${page.description}`);
});
console.log('');

console.log('2. Schema.org Validator:');
console.log('   https://validator.schema.org/');
validationUrls.forEach(page => {
  console.log(`   - ${page.description}`);
});
console.log('');

console.log('3. JSON-LD Playground:');
console.log('   https://json-ld.org/playground/');
console.log('');

console.log('📊 Expected Schema Types by Page:');
console.log('');
validationUrls.forEach((page, index) => {
  console.log(`${index + 1}. ${page.description}`);
  console.log(`   URL: ${page.url}`);
  console.log(`   Expected Schemas: ${page.expectedSchemas.join(', ')}`);
  console.log('');
});

// Check SEOHead component for schema generation
console.log('🔧 Current Schema Implementation Check:');
console.log('');

const seoHeadPath = path.join(__dirname, '..', 'src', 'components', 'SEOHead.tsx');
if (fs.existsSync(seoHeadPath)) {
  const seoHeadContent = fs.readFileSync(seoHeadPath, 'utf8');

  const schemaTypes = [
    'Organization',
    'WebSite',
    'SoftwareApplication',
    'Article',
    'FAQPage',
    'WebPage',
    'BreadcrumbList',
    'HowTo'
  ];

  console.log('✅ Schema types found in SEOHead component:');
  schemaTypes.forEach(type => {
    if (seoHeadContent.includes(`"@type": "${type}"`)) {
      console.log(`   ✓ ${type}`);
    }
  });
  console.log('');
} else {
  console.log('❌ SEOHead component not found');
  console.log('');
}

console.log('📝 Manual Validation Steps:');
console.log('');
console.log('1. Open browser DevTools (F12)');
console.log('2. Go to each URL listed above');
console.log('3. Check Console for any JSON-LD errors');
console.log('4. Use online validators to confirm schema validity');
console.log('5. Look for structured data in page source (<script type="application/ld+json">)');
console.log('');

console.log('🎯 Schema Validation Complete!');
console.log('');
console.log('Run this script anytime: node scripts/validate-schema.js');