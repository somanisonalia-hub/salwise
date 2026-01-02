const fs = require('fs');
const path = require('path');

// Get all directories in src/app that don't have page.tsx
function getDirectories(srcPath) {
  return fs.readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
    .filter(dir => !dir.startsWith('_') && dir !== 'api' && dir !== 'node_modules');
}

function createPageFile(dirPath, slug) {
  // Calculate relative paths based on depth
  const depth = slug.split('/').length;
  const libPath = '../'.repeat(depth + 1) + 'lib/pageGenerator';
  const componentPath = '../'.repeat(depth + 1) + 'components/DynamicPageClient';

  const content = `import { findPageBySlug } from '${libPath}';
import DynamicPageClient from '${componentPath}';

export async function generateMetadata() {
  const page = findPageBySlug('${slug}');

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.longTailKeywords].join(', '),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'website',
    },
  };
}

export default function Page() {
  return DynamicPageClient({ slug: "${slug}" });
}
`;

  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, content);
  console.log('Created: ' + filePath);
}

function processDirectory(basePath, currentPath = '', depth = 0) {
  const fullPath = path.join(basePath, currentPath);
  const directories = getDirectories(fullPath);

  for (const dir of directories) {
    const dirFullPath = path.join(fullPath, dir);
    const slug = currentPath ? currentPath + '/' + dir : dir;

    // Check if page.tsx already exists
    const pageFilePath = path.join(dirFullPath, 'page.tsx');
    if (!fs.existsSync(pageFilePath)) {
      createPageFile(dirFullPath, slug);
    }

    // Recursively process subdirectories
    processDirectory(basePath, slug, depth + 1);
  }
}

// Process all directories
processDirectory('./src/app');
console.log('All page files created successfully!');
