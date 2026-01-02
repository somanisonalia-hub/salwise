// Simple test to validate data integration
const fs = require('fs');
const path = require('path');

console.log('Testing SalaryWise.io Data Architecture...\n');

// Load JSON files
const pagesPath = path.join(__dirname, 'src/data/pages.json');
const calculatorsPath = path.join(__dirname, 'src/data/calculators.json');

const pagesData = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
const calculatorsData = JSON.parse(fs.readFileSync(calculatorsPath, 'utf8'));

console.log('📄 Pages loaded:', pagesData.pages.length);
console.log('🧮 Calculators loaded:', calculatorsData.calculators.length);

// Test data relationships
console.log('\n🔗 Testing data relationships...');

const calculatorPages = pagesData.pages.filter(p => p.type === 'calculator');
console.log('Calculator pages:', calculatorPages.length);

let validRelationships = 0;
let brokenRelationships = 0;

calculatorPages.forEach(page => {
  const calculator = calculatorsData.calculators.find(calc => calc.id === page.dataRef);
  if (calculator) {
    validRelationships++;
    console.log(`✅ ${page.slug} → ${calculator.name}`);
  } else {
    brokenRelationships++;
    console.log(`❌ ${page.slug} → Missing calculator: ${page.dataRef}`);
  }
});

console.log(`\n📊 Relationship check: ${validRelationships} valid, ${brokenRelationships} broken`);

// Test keyword coverage
const primaryKeywords = pagesData.pages.map(p => p.primaryKeyword);
const longTailKeywords = pagesData.pages.flatMap(p => p.longTailKeywords);

console.log('\n🎯 SEO Keyword Coverage:');
console.log('Primary keywords:', primaryKeywords.length);
console.log('Long-tail keywords:', longTailKeywords.length);
console.log('Total keywords:', primaryKeywords.length + longTailKeywords.length);

// Test sample calculation
console.log('\n🧮 Testing sample calculation...');
const grossToNetCalc = calculatorsData.calculators.find(c => c.id === 'grossToNet');
if (grossToNetCalc) {
  console.log('Formula:', JSON.stringify(grossToNetCalc.formula, null, 2));
  console.log('Inputs:', grossToNetCalc.inputs.length);
}

console.log('\n✅ Data architecture validation complete!');

