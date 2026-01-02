import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salarywise.io';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/salary-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hourly-to-salary`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gross-to-net`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/net-to-gross`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/overtime-pay`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bonus-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/take-home-pay`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Country pages
  const countries = ['usa', 'uk', 'ireland', 'canada', 'australia', 'germany', 'france', 'spain', 'india', 'singapore', 'netherlands', 'sweden', 'switzerland', 'new-zealand', 'south-africa'];
  const countryPages = countries.map(country => ({
    url: `${baseUrl}/country/${country}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Industry pages
  const industries = ['it', 'healthcare', 'engineering', 'teacher', 'finance', 'retail', 'construction', 'legal', 'marketing', 'startup'];
  const industryPages = industries.map(industry => ({
    url: `${baseUrl}/industry/${industry}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Guide pages
  const guides = ['gross-vs-net', 'salary-negotiation', 'how-to-calculate-take-home', 'taxes-by-country', 'salary-trends-2026'];
  const guidePages = guides.map(guide => ({
    url: `${baseUrl}/guides/${guide}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...countryPages, ...industryPages, ...guidePages];
}
