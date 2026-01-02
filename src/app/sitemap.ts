import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salarywise.io';
  const lastModified = new Date('2026-01-02');

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/salary-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hourly-to-salary-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gross-to-net-salary`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/net-to-gross-salary`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/overtime-pay-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bonus-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/take-home-pay-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Country pages
  const countries = ['usa', 'uk', 'ireland', 'canada', 'australia', 'germany', 'france', 'spain', 'india', 'singapore', 'netherlands', 'sweden', 'switzerland', 'new-zealand', 'south-africa'];
  const countryPages = countries.map(country => ({
    url: `${baseUrl}/salary-after-tax-${country}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Industry pages
  const industries = ['it-tech', 'healthcare', 'engineering', 'teacher', 'finance-banking', 'retail', 'construction', 'legal', 'marketing-sales', 'startup-entrepreneur'];
  const industryPages = industries.map(industry => ({
    url: `${baseUrl}/salary-calculator-${industry}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Guide pages
  const guides = ['understanding-gross-vs-net-salary', 'salary-negotiation-tips', 'how-to-calculate-take-home-pay', 'taxes-explained-by-country', 'salary-trends-2026-global'];
  const guidePages = guides.map(guide => ({
    url: `${baseUrl}/${guide}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...countryPages, ...industryPages, ...guidePages];
}

