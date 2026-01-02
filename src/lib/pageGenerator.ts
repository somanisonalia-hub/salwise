// Utility functions for generating pages from pages.json and calculators.json

export interface PageData {
  slug: string;
  type: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  related: string[];
  dataRef: string;
}

export interface PagesData {
  pages: PageData[];
}

// Import data
import pagesData from '../data/pages.json';
import { getCalculator, getCalculatorDefaults, validateCalculatorInputs } from './calculatorEngine';

// Utility to find a page by slug
export function findPageBySlug(slug: string): PageData | undefined {
  const page = pagesData.pages.find(page => page.slug === slug);
  return page as PageData | undefined;
}

// Utility to get all calculator pages
export function getCalculatorPages(): PageData[] {
  return pagesData.pages.filter(page => page.type === 'calculator');
}

// Utility to get all guide pages
export function getGuidePages(): PageData[] {
  return pagesData.pages.filter(page => page.type === 'guide');
}

// Utility to get related pages
export function getRelatedPages(pageSlug: string): PageData[] {
  const currentPage = findPageBySlug(pageSlug);
  if (!currentPage) return [];

  return currentPage.related
    .map(slug => findPageBySlug(slug))
    .filter((page): page is PageData => page !== undefined);
}

// Utility to get all primary keywords (for SEO analysis)
export function getAllPrimaryKeywords(): string[] {
  return pagesData.pages.map(page => page.primaryKeyword);
}

// Utility to get all long-tail keywords (for SEO analysis)
export function getAllLongTailKeywords(): string[] {
  return pagesData.pages.flatMap(page => page.longTailKeywords);
}

// Utility to search pages by keyword
export function searchPagesByKeyword(keyword: string): PageData[] {
  const searchTerm = keyword.toLowerCase();
  return pagesData.pages.filter(page =>
    page.primaryKeyword.toLowerCase().includes(searchTerm) ||
    page.longTailKeywords.some(ltk => ltk.toLowerCase().includes(searchTerm)) ||
    page.h1.toLowerCase().includes(searchTerm) ||
    page.metaTitle.toLowerCase().includes(searchTerm)
  );
}

// Utility to get pages by data reference
export function getPagesByDataRef(dataRef: string): PageData[] {
  return pagesData.pages.filter(page => page.dataRef === dataRef);
}

// Utility to generate sitemap URLs
export function generateSitemapUrls(baseUrl: string = 'https://salarywise.io'): Array<{ url: string; lastModified: Date }> {
  return pagesData.pages.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
  }));
}

// Utility to get SEO keywords for a page
export function getSEOKeywords(pageSlug: string): string[] {
  const page = findPageBySlug(pageSlug);
  if (!page) return [];

  return [page.primaryKeyword, ...page.longTailKeywords];
}

// Get calculator configuration for a page
export function getPageCalculator(pageSlug: string) {
  const page = findPageBySlug(pageSlug);
  if (!page || page.type !== 'calculator') return null;

  return getCalculator(page.dataRef);
}

// Get calculator defaults for a page
export function getPageCalculatorDefaults(pageSlug: string): Record<string, number | string> {
  const page = findPageBySlug(pageSlug);
  if (!page || page.type !== 'calculator') return {};

  return getCalculatorDefaults(page.dataRef);
}

// Validate calculator inputs for a page
export function validatePageCalculatorInputs(
  pageSlug: string,
  values: Record<string, number | string>
) {
  const page = findPageBySlug(pageSlug);
  if (!page || page.type !== 'calculator') {
    return { isValid: false, errors: ['Page not found or not a calculator'] };
  }

  return validateCalculatorInputs(page.dataRef, values);
}

// Get page SEO data for meta tags
export function getPageSEOData(pageSlug: string) {
  const page = findPageBySlug(pageSlug);
  if (!page) return null;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.longTailKeywords].join(', '),
    h1: page.h1,
  };
}

// Get all calculator pages with their configurations
export function getCalculatorPagesWithConfig() {
  return getCalculatorPages().map(page => ({
    ...page,
    calculator: getCalculator(page.dataRef),
    defaults: getCalculatorDefaults(page.dataRef),
  }));
}

// Generate structured data for calculator pages
export function generateCalculatorStructuredData(pageSlug: string) {
  const page = findPageBySlug(pageSlug);
  const calculator = getPageCalculator(pageSlug);

  if (!page || !calculator) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": page.h1,
    "description": page.metaDescription,
    "url": `https://salarywise.io/${page.slug}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

// Export the raw data
export { pagesData };
export default pagesData;
