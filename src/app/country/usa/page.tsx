import CountryHubPage from '../../../components/CountryHubPage';
import pageData from '../../../locales/en/country/usa.json';

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
  return <CountryHubPage pageData={pageData} />
}
