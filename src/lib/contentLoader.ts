export async function loadContent(locale: string, path: string) {
  try {
    const content = await import(`../locales/${locale}/${path}.json`);
    return content.default;
  } catch (error) {
    // Fallback to English
    try {
      const fallbackContent = await import(`../locales/en/${path}.json`);
      return fallbackContent.default;
    } catch (fallbackError) {
      console.error(`Content not found: ${path} for locale ${locale}`);
      return {};
    }
  }
}

export async function loadPageContent(locale: string, pageType: string, slug?: string) {
  const path = slug ? `${pageType}/${slug}` : pageType;
  return loadContent(locale, path);
}

