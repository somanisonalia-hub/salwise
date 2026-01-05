import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://salarywise.io';

  // Batch 3: Guide Articles (5 URLs)
  const batch3Pages = [
    // Guide Articles
    {
      url: `${baseUrl}/en/guides/how-to-calculate-take-home`,
      lastModified: new Date('2025-01-08'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/gross-vs-net-salary`,
      lastModified: new Date('2025-01-08'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/salary-negotiation-tips`,
      lastModified: new Date('2025-01-08'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/taxes-explained-by-country`,
      lastModified: new Date('2025-01-08'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/guides/salary-trends-2026`,
      lastModified: new Date('2025-01-08'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${batch3Pages.map(page => `  <url>
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
