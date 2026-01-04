import Head from 'next/head';
import React from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  structuredData?: object;
  calculatorType?: string;
  pageType?: 'calculator' | 'guide' | 'article' | 'webpage' | 'collection' | 'index';
  keywords?: string[];
  breadcrumb?: Array<{name: string, url: string}>;
  featureList?: string[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  structuredData,
  calculatorType,
  pageType = 'webpage',
  keywords = [],
  breadcrumb = [],
  featureList = []
}) => {
  const fullTitle = `${title} | SalaryWise.io`;
  const siteUrl = 'https://salarywise.io';

  // Generate appropriate schema markup based on page type
  const generateStructuredData = () => {
    const schemas = [];

    // Always add Organization schema for brand authority
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SalaryWise.io",
      "url": "https://salarywise.io",
      "description": "Free salary calculators for Ireland, UK, and USA. Compare take-home pay with accurate tax calculations.",
      "sameAs": [
        "https://salarywise.io"
      ]
    });

    // Add BreadcrumbList for all pages
    if (breadcrumb.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      });
    }

    // Page-specific schemas
    switch (pageType) {
      case 'calculator':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": title,
          "url": canonicalUrl || siteUrl,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "softwareVersion": "1.0",
          "description": description,
          "featureList": featureList.length > 0 ? featureList : [
            "Tax calculations",
            "Deductions calculation",
            "Net salary estimation",
            "Multiple payment frequencies"
          ],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "SalaryWise.io",
            "url": "https://salarywise.io"
          }
        });
        break;

      case 'guide':
      case 'article':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "url": canonicalUrl || siteUrl,
          "author": {
            "@type": "Organization",
            "name": "SalaryWise.io"
          },
          "datePublished": "2026-01-04",
          "dateModified": "2026-01-04",
          "mainEntityOfPage": canonicalUrl || siteUrl,
          "description": description,
          "keywords": keywords.join(", "),
          "publisher": {
            "@type": "Organization",
            "name": "SalaryWise.io",
            "url": "https://salarywise.io"
          }
        });
        break;

      case 'collection':
      case 'index':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": title,
          "url": canonicalUrl || siteUrl,
          "description": description
        });
        break;

      case 'webpage':
      default:
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "url": canonicalUrl || siteUrl,
          "description": description,
          "breadcrumb": breadcrumb.length > 0 ? {
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumb.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          } : undefined
        });
        break;
    }

    return schemas;
  };

  const defaultStructuredData = generateStructuredData();

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="canonical" href={canonicalUrl || siteUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || siteUrl} />
      <meta property="og:site_name" content="SalaryWise.io" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="alternate" hrefLang="en" href={canonicalUrl || siteUrl} />
      <meta name="theme-color" content="#3B82F6" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="author" content="SalaryWise.io" />
      <meta name="keywords" content="salary calculator, pay calculator, gross to net, take home pay, salary comparison" />

      {/* Structured Data */}
      {finalStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalStructuredData)
          }}
        />
      )}
    </Head>
  );
};
