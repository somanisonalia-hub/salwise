import { MetadataRoute } from 'next';

// Required for static export compatibility
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salarywise.io';
  const lastModified = new Date('2026-01-04');

  // Static pages - English locale URLs
  const staticPages = [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/salary-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/hourly-to-salary-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/gross-to-net-salary`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/net-to-gross-salary`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/overtime-pay-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/bonus-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/take-home-pay-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/loan-emi-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/salary-vs-expenses-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/annual-raise-promotion-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/salary-vs-freelance-income-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/savings-from-salary-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/retirement-contribution-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/salary-after-tax-calculator`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/annual-raise-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/salary-comparison-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/take-home-vs-cost-of-living-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/overtime-bonus-tax-calculator`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Country pages - All country calculators
  const countries = ['usa', 'uk', 'ireland', 'canada', 'australia', 'germany', 'france', 'spain', 'india', 'singapore', 'netherlands', 'sweden', 'switzerland', 'new-zealand', 'south-africa'];
  const countryPages = countries.map(country => ({
    url: `${baseUrl}/en/${country}-salary-calculator`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Industry pages - Job-specific calculators
  const industries = ['it-tech', 'healthcare', 'engineering', 'teacher', 'finance-banking', 'retail', 'construction', 'legal', 'marketing-sales', 'startup-entrepreneur'];
  const industryPages = industries.map(industry => ({
    url: `${baseUrl}/en/salary-calculator-${industry}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Guide pages - Educational content
  const guides = ['understanding-gross-vs-net-salary', 'salary-negotiation-tips', 'how-to-calculate-take-home-pay', 'taxes-explained-by-country', 'salary-trends-2026-global'];
  const guidePages = guides.map(guide => ({
    url: `${baseUrl}/en/${guide}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Index pages
  const indexPages = [
    {
      url: `${baseUrl}/en/country`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/industry`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Essential pages for AdSense compliance and user experience
  const essentialPages = [
    {
      url: `${baseUrl}/en/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms-of-service`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/disclaimer`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/how-salary-calculators-work`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/salary-guide`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/cookies`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...countryPages, ...industryPages, ...guidePages, ...indexPages, ...essentialPages];
}

