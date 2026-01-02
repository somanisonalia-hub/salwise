// Script to generate individual page files for each route
const fs = require('fs');
const path = require('path');

const pages = [
  'salary-calculator',
  'gross-to-net',
  'net-to-gross',
  'take-home-pay',
  'hourly-to-salary',
  'bonus-calculator',
  'country/usa',
  'country/uk',
  'country/ireland',
  'country/canada',
  'country/australia',
  'country/india',
  'guides/how-to-calculate-take-home',
  'guides/gross-vs-net',
  'guides/salary-negotiation'
];

const pageTemplate = (slug) => {
  const pathSegments = slug.split('/');
  const depth = pathSegments.length;
  const libPath = '../'.repeat(depth + 1) + 'lib/pageGenerator';
  const componentPath = '../'.repeat(depth + 1) + 'components/DynamicPageClient';

  const template = `import { findPageBySlug } from '` + libPath + `';
import DynamicPageClient from '` + componentPath + `';

export async function generateMetadata() {
  const page = findPageBySlug('` + slug + `');

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
  return DynamicPageClient({ slug: "` + slug + `" });
}
`;

  return template;
};

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

pages.forEach(pageSlug => {
  const dirPath = path.join('src/app', pageSlug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the page file
  fs.writeFileSync(filePath, pageTemplate(pageSlug));
  console.log('Created: ' + filePath);
});

console.log('All page files generated successfully!');
