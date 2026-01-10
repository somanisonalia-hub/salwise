const fs = require('fs');
const path = require('path');

// Function to recursively find all JSON files
function findJsonFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findJsonFiles(fullPath, files);
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to add SEO metadata to a JSON file
function addSEOMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    // Skip if already has metaTitle
    if (data.metaTitle) {
      return false;
    }

    // Extract title and description from existing fields
    const title = data.title || data.h1 || data.name || 'Salary Calculator';
    const description = data.description || data.intro?.paragraph1 || 'Calculate your salary and taxes with our free calculator tools.';
    const h1 = data.h1 || data.title || data.name;
    const slug = data.slug || path.basename(filePath, '.json');

    // Add standardized SEO metadata
    data = {
      slug,
      type: data.type || 'page',
      h1,
      metaTitle: title,
      metaDescription: description.length > 160 ? description.substring(0, 157) + '...' : description,
      primaryKeyword: data.primaryKeyword || title,
      longTailKeywords: data.longTailKeywords || [title],
      related: data.related || [],
      canonical: data.canonical || `https://salarywise.io/en/${slug}`,
      robots: data.robots || 'index, follow',
      lastUpdated: data.lastUpdated || 'January 4, 2025',
      ...data
    };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
const localesDir = path.join(__dirname, '..', 'src', 'locales', 'en');
console.log('🔍 Scanning for JSON files in:', localesDir);

const jsonFiles = findJsonFiles(localesDir);
console.log(`📁 Found ${jsonFiles.length} JSON files`);

let updatedCount = 0;
let skippedCount = 0;

for (const file of jsonFiles) {
  if (addSEOMetadata(file)) {
    console.log(`✅ Updated: ${path.relative(localesDir, file)}`);
    updatedCount++;
  } else {
    skippedCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`✅ Updated: ${updatedCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files (already had SEO metadata)`);
console.log(`🎯 Total SEO metadata coverage: ${((updatedCount + skippedCount) / jsonFiles.length * 100).toFixed(1)}%`);