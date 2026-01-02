import DynamicPageClient from '../../../components/DynamicPageClient';
import pageData from '../../../locales/en/country/australia.json';

export function generateMetadata() {
  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: [pageData.primaryKeyword, ...pageData.longTailKeywords].join(', '),
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      type: 'website',
    },
  };
}

export default function Page() {
  return <DynamicPageClient pageData={pageData} />
}
