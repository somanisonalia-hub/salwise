import CountryHubPage from '../../../components/CountryHubPage';
import pageData from '../../../locales/en/country/ireland.json';

export function generateMetadata() {
  const data = pageData as any;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [data.primaryKeyword, ...data.longTailKeywords].join(', '),
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
    },
  };
}

export default function Page() {
  const data = pageData as any;
  return <CountryHubPage pageData={data} />
}
