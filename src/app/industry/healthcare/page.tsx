import { findPageBySlug } from '../../../lib/pageGenerator';
import DynamicPageClient from '../../../components/DynamicPageClient';

export async function generateMetadata() {
  const page = findPageBySlug('industry/healthcare');

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.longTailKeywords].join(', '),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'website',
    },
  };
}

export default function Page() {
  return <DynamicPageClient slug="industry/healthcare" />
}
