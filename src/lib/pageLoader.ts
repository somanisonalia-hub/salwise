/**
 * Multi-file JSON loader for SalaryWise.io
 * Loads page data and calculator data for current locale
 */

export interface PageData {
  slug: string;
  type: 'calculator' | 'guide';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  related: string[];
  dataRef: string;
  intro?: {
    title: string;
    description: string;
    features?: string[];
    readTime?: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  tips?: string[];
  disclaimer?: string | { title: string; content: string };
  sections?: Array<{
    title: string;
    content: string;
    examples?: string[];
    taxes?: Array<{
      name: string;
      description: string;
      example: string;
    }>;
  }>;
  country?: {
    name: string;
    flag: string;
    currency: string;
    taxSystem: string;
  };
}

export interface CalculatorData {
  id: string;
  name: string;
  description: string;
  inputs: Array<{
    id: string;
    label: string;
    type: 'number' | 'select' | 'text';
    default: number | string;
    unit?: string;
    placeholder?: string;
    required: boolean;
    min?: number;
    max?: number;
    description?: string;
    options?: Array<{
      value: string;
      label: string;
    }>;
  }>;
  formula: Record<string, string>;
  outputLabels: Record<string, string>;
  outputUnits: Record<string, string>;
}

/**
 * Load page data for a specific locale and slug
 */
export async function loadPageData(slug: string, locale: string = 'en'): Promise<PageData> {
  try {
    let pageData;

    // Load page data based on slug type
    if (slug.startsWith('country/')) {
      // Country pages: ../locales/${locale}/country/${country}.json
      const country = slug.split('/')[1];
      pageData = await import(`../locales/${locale}/country/${country}.json`);
    } else if (slug.startsWith('industry/')) {
      // Industry pages: ../locales/${locale}/industry/${industry}.json
      const industry = slug.split('/')[1];
      pageData = await import(`../locales/${locale}/industry/${industry}.json`);
    } else if (slug.startsWith('guides/')) {
      // Guide pages: ../locales/${locale}/guides/${guide}.json
      const guide = slug.split('/')[1];
      pageData = await import(`../locales/${locale}/guides/${guide}.json`);
    } else {
      // Basic calculator pages: ../locales/${locale}/${slug}.json
      pageData = await import(`../locales/${locale}/${slug}.json`);
    }

    return pageData.default || pageData;
  } catch (error) {
    console.error(`Failed to load page data for ${locale}/${slug}:`, error);
    // Fallback to English
    if (locale !== 'en') {
      return loadPageData(slug, 'en');
    }
    throw new Error(`Page data not found for ${slug}`);
  }
}

/**
 * Load calculator data (language-agnostic formulas and logic)
 */
export async function loadCalculatorData(calculatorId: string): Promise<CalculatorData> {
  try {
    const calculatorData = await import(`../data/calculators/${calculatorId}.json`);
    return calculatorData.default || calculatorData;
  } catch (error) {
    console.error(`Failed to load calculator data for ${calculatorId}:`, error);
    throw new Error(`Calculator data not found for ${calculatorId}`);
  }
}

/**
 * Load calculator UI labels for a specific locale
 */
export async function loadCalculatorLabels(calculatorId: string, locale: string = 'en'): Promise<Partial<CalculatorData>> {
  try {
    const labels = await import(`../locales/${locale}/calculators/${calculatorId}.json`);
    return labels.default || labels;
  } catch (error) {
    // Fallback to English labels or empty object
    if (locale !== 'en') {
      try {
        return loadCalculatorLabels(calculatorId, 'en');
      } catch {
        return {};
      }
    }
    return {};
  }
}

/**
 * Load complete page with calculator data
 */
export async function loadPageWithCalculator(slug: string, locale: string = 'en') {
  const pageData = await loadPageData(slug, locale);

  let calculatorData: CalculatorData | null = null;
  if (pageData.type === 'calculator' && pageData.dataRef) {
    // Load calculator formulas (same for all languages)
    calculatorData = await loadCalculatorData(pageData.dataRef);

    // Load localized labels and merge
    const localizedLabels = await loadCalculatorLabels(pageData.dataRef, locale);
    if (localizedLabels.inputs) {
      // Merge localized labels with base calculator data
      calculatorData.inputs = calculatorData.inputs.map(input => ({
        ...input,
        ...localizedLabels.inputs?.find(localized => localized.id === input.id)
      }));
    }
  }

  return {
    pageData,
    calculatorData
  };
}

// Utility function to get all available pages for a locale
export async function getAllPages(locale: string = 'en'): Promise<PageData[]> {
  // This would scan the directory or have a manifest file
  // For now, return static list
  const slugs = [
    'salary-calculator',
    'gross-to-net',
    'net-to-gross',
    'take-home-pay',
    'hourly-to-salary',
    'bonus-calculator',
    'overtime-pay',
    'country/usa',
    'country/uk',
    'country/canada',
    'guides/gross-vs-net',
    'guides/how-to-calculate-take-home',
    'guides/salary-negotiation'
  ];

  const pages = await Promise.all(
    slugs.map(slug => loadPageData(slug, locale))
  );

  return pages;
}

// Utility function to get related pages for a given slug and locale
export async function getRelatedPages(slug: string, locale: string = 'en'): Promise<PageData[]> {
  try {
    // Load the current page to get related slugs
    const currentPage = await loadPageData(slug, locale);

    // Load each related page
    const relatedPages = await Promise.all(
      currentPage.related.map(async (relatedSlug: string) => {
        try {
          return await loadPageData(relatedSlug, locale);
        } catch {
          // If related page doesn't exist in this locale, try English
          return await loadPageData(relatedSlug, 'en');
        }
      })
    );

    return relatedPages;
  } catch (error) {
    console.error(`Failed to load related pages for ${slug}:`, error);
    return [];
  }
}

// Utility function to check if a locale exists
export async function localeExists(locale: string): Promise<boolean> {
  try {
    // Try to load a common page to test if locale exists
    await loadPageData('salary-calculator', locale);
    return true;
  } catch {
    return false;
  }
}
