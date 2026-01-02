import { promises as fs } from 'fs';
import path from 'path';
import DynamicPageClient from '../../../components/DynamicPageClient';

export async function generateMetadata() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'locales', 'en', 'country', 'ireland.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const pageData = JSON.parse(fileContent);

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
  } catch (error) {
    return {
      title: 'Ireland Salary Calculator - SalaryWise.io',
    };
  }
}

export default async function Page() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'locales', 'en', 'country', 'ireland.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const pageData = JSON.parse(fileContent);

    return <DynamicPageClient pageData={pageData} />
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The requested page could not be loaded.</p>
        </div>
      </div>
    );
  }
}
