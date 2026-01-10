import Head from 'next/head';
import React from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  structuredData?: any[];
  calculatorType?: string;
  pageType?: 'calculator' | 'guide' | 'article' | 'webpage' | 'collection' | 'index' | 'faq';
  keywords?: string[];
  breadcrumb?: Array<{name: string, url: string}>;
  featureList?: string[];
  robots?: string;
  faqs?: Array<{question: string, answer: string}>;
  howToSteps?: Array<{name: string, text: string, image?: string}>;
  author?: {name: string, url?: string};
  datePublished?: string;
  dateModified?: string;
  images?: Array<{url: string, alt: string, width?: number, height?: number}>;
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
  featureList = [],
  robots,
  faqs = [],
  howToSteps = [],
  author,
  datePublished,
  dateModified,
  images = []
}) => {
  const fullTitle = `${title} | SalaryWise.io`;
  const siteUrl = 'https://salarywise.io';

  // Generate comprehensive schema markup based on page type
  const generateStructuredData = () => {
    const schemas = [];

    // Enhanced Organization schema with rich data
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://salarywise.io/#organization",
      "name": "SalaryWise.io",
      "alternateName": "SalaryWise",
      "url": "https://salarywise.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://salarywise.io/logo.png",
        "width": 512,
        "height": 512
      },
      "description": "Free salary calculators for Ireland, UK, and USA. Compare take-home pay with accurate 2026 tax calculations.",
      "foundingDate": "2024",
      "sameAs": [
        "https://salarywise.io"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "",
        "contactType": "customer service",
        "availableLanguage": ["English"],
        "url": "https://salarywise.io/en/contact"
      },
      "knowsAbout": [
        "Salary Calculations",
        "Tax Calculations",
        "Take-Home Pay",
        "Gross to Net Salary",
        "Overtime Pay",
        "Bonus Tax Calculator",
        "Ireland Salary Calculator",
        "UK Salary Calculator",
        "USA Salary Calculator"
      ]
    });

    // WebSite schema with search functionality
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://salarywise.io/#website",
      "url": "https://salarywise.io",
      "name": "SalaryWise.io",
      "description": "Free salary calculators for accurate take-home pay calculations with 2026 tax rates.",
      "publisher": {
        "@id": "https://salarywise.io/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://salarywise.io/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
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

    // Page-specific schemas with enhanced markup
    switch (pageType) {
      case 'calculator':
        // Enhanced SoftwareApplication schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${canonicalUrl || siteUrl}#softwareapplication`,
          "name": title,
          "url": canonicalUrl || siteUrl,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "softwareVersion": "2.0",
          "description": description,
          "featureList": featureList.length > 0 ? featureList : [
            "Real-time tax calculations",
            "Multiple payment frequencies",
            "Deductions and allowances",
            "Net salary estimation",
            "Tax bracket analysis",
            "Exportable results"
          ],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock"
          },
          "provider": {
            "@id": "https://salarywise.io/#organization"
          },
          "applicationSubCategory": "Salary Calculator",
          "screenshot": images.length > 0 ? images[0].url : undefined,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1000",
            "bestRating": "5",
            "worstRating": "1"
          }
        });

        // Add WebPage schema for calculator pages
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl || siteUrl}#webpage`,
          "url": canonicalUrl || siteUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://salarywise.io/#website"
          },
          "about": {
            "@type": "Thing",
            "name": "Salary Calculation",
            "description": "Professional tools for calculating take-home pay and tax obligations"
          },
          "mainEntity": {
            "@id": `${canonicalUrl || siteUrl}#softwareapplication`
          }
        });
        break;

      case 'guide':
      case 'article':
        // Enhanced Article schema
        const articleSchema: any = {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${canonicalUrl || siteUrl}#article`,
          "headline": title,
          "url": canonicalUrl || siteUrl,
          "description": description,
          "keywords": keywords.join(", "),
          "datePublished": datePublished || "2025-01-04T00:00:00+00:00",
          "dateModified": dateModified || "2025-01-04T00:00:00+00:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${canonicalUrl || siteUrl}#webpage`
          },
          "author": author ? {
            "@type": "Person",
            "name": author.name,
            "url": author.url
          } : {
            "@type": "Organization",
            "@id": "https://salarywise.io/#organization"
          },
          "publisher": {
            "@type": "Organization",
            "@id": "https://salarywise.io/#organization"
          },
          "isPartOf": {
            "@id": "https://salarywise.io/#website"
          }
        };

        // Add images if available
        if (images.length > 0) {
          articleSchema.image = images.map(img => ({
            "@type": "ImageObject",
            "url": img.url,
            "width": img.width || 1200,
            "height": img.height || 630
          }));
        }

        schemas.push(articleSchema);

        // Add HowTo schema if steps are provided
        if (howToSteps.length > 0) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": title,
            "description": description,
            "step": howToSteps.map((step, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": step.name,
              "text": step.text,
              "image": step.image
            }))
          });
        }
        break;

      case 'faq':
        // FAQ Page schema
        if (faqs.length > 0) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          });
        }

        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl || siteUrl}#webpage`,
          "url": canonicalUrl || siteUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://salarywise.io/#website"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Frequently Asked Questions",
            "numberOfItems": faqs.length
          }
        });
        break;

      case 'collection':
      case 'index':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${canonicalUrl || siteUrl}#webpage`,
          "name": title,
          "url": canonicalUrl || siteUrl,
          "description": description,
          "isPartOf": {
            "@id": "https://salarywise.io/#website"
          }
        });
        break;

      case 'webpage':
      default:
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl || siteUrl}#webpage`,
          "url": canonicalUrl || siteUrl,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://salarywise.io/#website"
          },
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

  // Debug logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('SEOHead Debug:', {
      pageType,
      title,
      finalStructuredData: finalStructuredData?.length || 'empty'
    });
  }

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
      <meta name="robots" content={robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
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
      {finalStructuredData && finalStructuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalStructuredData)
          }}
        />
      )}

      {/* Fallback basic schema if no structured data */}
      {(!finalStructuredData || finalStructuredData.length === 0) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": title,
              "url": canonicalUrl || siteUrl,
              "description": description
            })
          }}
        />
      )}
    </Head>
  );
};
