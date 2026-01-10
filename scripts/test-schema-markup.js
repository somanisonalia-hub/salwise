const axios = require('axios');
const cheerio = require('cheerio');

// Test schema markup validation
async function validateSchemaMarkup() {
  console.log('🔍 Automated Schema Markup Validation for SalaryWise.io\n');

  const testUrls = [
    {
      url: 'http://localhost:3000/en/',
      expectedSchemas: ['WebSite', 'Organization', 'BreadcrumbList'],
      description: 'Homepage'
    },
    {
      url: 'http://localhost:3000/en/ireland-salary-calculator',
      expectedSchemas: ['SoftwareApplication', 'WebPage', 'Organization', 'BreadcrumbList'],
      description: 'Ireland Salary Calculator'
    },
    {
      url: 'http://localhost:3000/en/understanding-gross-vs-net-salary',
      expectedSchemas: ['Article', 'WebPage', 'Organization', 'BreadcrumbList'],
      description: 'Guide: Gross vs Net Salary'
    },
    {
      url: 'http://localhost:3000/en/faq',
      expectedSchemas: ['FAQPage', 'WebPage', 'Organization', 'BreadcrumbList'],
      description: 'FAQ Page'
    }
  ];

  for (const testCase of testUrls) {
    console.log(`📄 Testing: ${testCase.description}`);
    console.log(`   URL: ${testCase.url}`);

    try {
      const response = await axios.get(testCase.url);
      const $ = cheerio.load(response.data);

      // Find all JSON-LD scripts
      const jsonLdScripts = [];
      $('script[type="application/ld+json"]').each((i, elem) => {
        try {
          const jsonContent = $(elem).html().trim();
          if (jsonContent) {
            jsonLdScripts.push(JSON.parse(jsonContent));
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON-LD found: ${e.message}`);
        }
      });

      if (jsonLdScripts.length === 0) {
        console.log(`   ❌ No JSON-LD structured data found`);
        console.log('');
        continue;
      }

      console.log(`   ✅ Found ${jsonLdScripts.length} JSON-LD scripts`);

      // Check for expected schema types
      const foundSchemas = [];
      jsonLdScripts.forEach((schema, index) => {
        if (schema['@type']) {
          foundSchemas.push(schema['@type']);
        } else if (Array.isArray(schema) && schema.length > 0) {
          // Handle arrays of schemas
          schema.forEach(item => {
            if (item['@type']) {
              foundSchemas.push(item['@type']);
            }
          });
        }
      });

      console.log(`   📊 Schema types found: ${foundSchemas.join(', ')}`);

      // Check if all expected schemas are present
      const missingSchemas = testCase.expectedSchemas.filter(
        expected => !foundSchemas.includes(expected)
      );

      if (missingSchemas.length === 0) {
        console.log(`   ✅ All expected schemas present`);
      } else {
        console.log(`   ⚠️  Missing schemas: ${missingSchemas.join(', ')}`);
      }

      // Basic validation of schema structure
      let validationErrors = 0;
      jsonLdScripts.forEach((schema, index) => {
        // Check for required @context
        if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
          console.log(`   ❌ Schema ${index + 1}: Missing or invalid @context`);
          validationErrors++;
        }

        // Check for @type
        if (!schema['@type']) {
          console.log(`   ❌ Schema ${index + 1}: Missing @type`);
          validationErrors++;
        }

        // Validate Organization schema
        if (schema['@type'] === 'Organization') {
          const requiredFields = ['name', 'url'];
          requiredFields.forEach(field => {
            if (!schema[field]) {
              console.log(`   ❌ Organization schema: Missing ${field}`);
              validationErrors++;
            }
          });
        }

        // Validate WebSite schema
        if (schema['@type'] === 'WebSite') {
          if (!schema.name || !schema.url) {
            console.log(`   ❌ WebSite schema: Missing name or url`);
            validationErrors++;
          }
        }

        // Validate SoftwareApplication schema
        if (schema['@type'] === 'SoftwareApplication') {
          const requiredFields = ['name', 'applicationCategory', 'offers'];
          requiredFields.forEach(field => {
            if (!schema[field]) {
              console.log(`   ❌ SoftwareApplication schema: Missing ${field}`);
              validationErrors++;
            }
          });
        }

        // Validate Article schema
        if (schema['@type'] === 'Article') {
          const requiredFields = ['headline', 'author', 'publisher', 'datePublished'];
          requiredFields.forEach(field => {
            if (!schema[field]) {
              console.log(`   ❌ Article schema: Missing ${field}`);
              validationErrors++;
            }
          });
        }

        // Validate FAQPage schema
        if (schema['@type'] === 'FAQPage') {
          if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
            console.log(`   ❌ FAQPage schema: Missing or invalid mainEntity array`);
            validationErrors++;
          }
        }
      });

      if (validationErrors === 0) {
        console.log(`   ✅ Schema validation passed`);
      } else {
        console.log(`   ❌ ${validationErrors} validation errors found`);
      }

    } catch (error) {
      console.log(`   ❌ Error fetching page: ${error.message}`);
      console.log('   💡 Make sure development server is running: npm run dev');
    }

    console.log('');
  }

  console.log('🎯 Schema Validation Complete!');
  console.log('');
  console.log('For comprehensive validation, also use:');
  console.log('• Google Rich Results Test: https://search.google.com/test/rich-results');
  console.log('• Schema.org Validator: https://validator.schema.org/');
}

// Run validation if axios is available
if (typeof require !== 'undefined') {
  try {
    validateSchemaMarkup().catch(console.error);
  } catch (error) {
    console.log('❌ Error running validation. Make sure axios and cheerio are installed:');
    console.log('npm install axios cheerio');
    console.log('');
    console.log('Manual validation instructions:');
    console.log('1. Start dev server: npm run dev');
    console.log('2. Visit pages in browser');
    console.log('3. Check page source for <script type="application/ld+json">');
    console.log('4. Use online validators above');
  }
}

module.exports = { validateSchemaMarkup };