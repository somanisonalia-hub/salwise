import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// Required for static export compatibility
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salarywise.io';

  // Staggered lastmod dates for batch control
  const batch1Date = new Date('2025-01-06'); // Core calculators - crawl first
  const batch2Date = new Date('2025-01-07'); // Essential pages - crawl second
  const batch3Date = new Date('2025-01-08'); // Guides - crawl last

  // ===========================================
  // BATCH 1: Main Country Calculators + Global Tools (19 URLs)
  // Focus: Core calculators users will click first
  // ===========================================

  const batch1Pages: MetadataRoute.Sitemap = [
    // Ireland Calculators (5 pages) - Priority 1.0, Daily updates
    {
      url: `${baseUrl}/en/ireland-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-hourly-to-salary`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-overtime-pay`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-bonus-tax`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-contractor-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // UK Calculators (5 pages) - Priority 1.0, Daily updates
    {
      url: `${baseUrl}/en/uk-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-hourly-to-salary`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-overtime-pay`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-bonus-tax`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-contractor-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // USA Calculators (5 pages) - Priority 1.0, Daily updates
    {
      url: `${baseUrl}/en/usa-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-hourly-to-salary`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-overtime-pay`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-bonus-tax`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-contractor-salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // Global Tools (4 pages) - Priority 1.0, Daily updates
    {
      url: `${baseUrl}/en/salary-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/gross-to-net-salary`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/take-home-pay-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/salary-after-tax-calculator`,
      lastModified: batch1Date,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // ===========================================
  // BATCH 2: Essential / Legal Pages (18 URLs)
  // Focus: Trust & compliance pages for AdSense
  // ===========================================

  const batch2Pages: MetadataRoute.Sitemap = [
    // Core Essential Pages - Priority 0.8, Monthly updates
    {
      url: `${baseUrl}/en/about`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/terms-of-service`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/disclaimer`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/cookies`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Content Pages - Priority 0.8, Monthly updates
    {
      url: `${baseUrl}/en/faq`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/how-salary-calculators-work`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/salary-guide`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Navigation Pages - Priority 0.8, Monthly updates
    {
      url: `${baseUrl}/en/country`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/ireland`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/uk`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/usa`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Educational Content - Priority 0.8, Monthly updates
    {
      url: `${baseUrl}/en/understanding-gross-vs-net-salary`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/sitemap`,
      lastModified: batch2Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // ===========================================
  // BATCH 3: Guide Articles (5 URLs)
  // Focus: Content depth for SEO / indexing
  // ===========================================

  const batch3Pages: MetadataRoute.Sitemap = [
    // Guide Articles - Priority 0.6, Weekly updates
    {
      url: `${baseUrl}/en/guides/how-to-calculate-take-home`,
      lastModified: batch3Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/gross-vs-net-salary`,
      lastModified: batch3Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/salary-negotiation-tips`,
      lastModified: batch3Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/taxes-explained-by-country`,
      lastModified: batch3Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/salary-trends-2026`,
      lastModified: batch3Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  // Create public directory sitemaps for static export
  const generateSitemapXML = (pages: MetadataRoute.Sitemap, filename: string) => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified instanceof Date ? page.lastModified.toISOString() : page.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${page.changeFrequency || 'monthly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, filename), xmlContent);
    console.log(`Generated ${filename} with ${pages.length} URLs`);
  };

  // Generate the three batch sitemaps in public directory
  generateSitemapXML(batch1Pages, 'sitemap-batch1.xml');
  generateSitemapXML(batch2Pages, 'sitemap-batch2.xml');
  generateSitemapXML(batch3Pages, 'sitemap-batch3.xml');

  // Return all pages for the main sitemap (optional - can return empty for separate files only)
  return [...batch1Pages, ...batch2Pages, ...batch3Pages];
}
