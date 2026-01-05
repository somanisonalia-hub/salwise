import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://salarywise.io';

  // Batch 1: Main Country Calculators + Global Tools (19 URLs)
  const batch1Pages = [
    // Ireland Calculators (5 pages)
    {
      url: `${baseUrl}/en/ireland-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-hourly-to-salary`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-overtime-pay`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-bonus-tax`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/ireland-contractor-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // UK Calculators (5 pages)
    {
      url: `${baseUrl}/en/uk-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-hourly-to-salary`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-overtime-pay`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-bonus-tax`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/uk-contractor-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // USA Calculators (5 pages)
    {
      url: `${baseUrl}/en/usa-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-hourly-to-salary`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-overtime-pay`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-bonus-tax`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/usa-contractor-salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },

    // Global Tools (4 pages)
    {
      url: `${baseUrl}/en/salary-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/gross-to-net-salary`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/take-home-pay-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/salary-after-tax-calculator`,
      lastModified: new Date('2025-01-04'),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${batch1Pages.map(page => `  <url>
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
