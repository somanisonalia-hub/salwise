import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://salarywise.io';

  // Batch 2: Essential / Legal Pages (18 URLs)
  const batch2Pages = [
    // Core Essential Pages
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/terms-of-service`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/disclaimer`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/cookies`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Content Pages
    {
      url: `${baseUrl}/en/faq`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/how-salary-calculators-work`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/salary-guide`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Navigation Pages
    {
      url: `${baseUrl}/en/country`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/ireland`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/uk`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/country/usa`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // Educational Content
    {
      url: `${baseUrl}/en/understanding-gross-vs-net-salary`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/sitemap`,
      lastModified: new Date('2025-01-06'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${batch2Pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
