const puppeteer = require('puppeteer');

// SEO Check script for SalaryWise.io with browser rendering
async function checkSEO() {
  console.log('🔍 SEO Check for SalaryWise.io Pages (with browser rendering)\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const testPages = [
    {
      url: 'http://localhost:3000/',
      name: 'Homepage'
    },
    {
      url: 'http://localhost:3000/en/ireland-salary-calculator',
      name: 'Ireland Salary Calculator'
    },
    {
      url: 'http://localhost:3000/en/understanding-gross-vs-net-salary',
      name: 'Guide: Gross vs Net Salary'
    },
    {
      url: 'http://localhost:3000/en/faq',
      name: 'FAQ Page'
    },
    {
      url: 'http://localhost:3000/en/about',
      name: 'About Page'
    }
  ];

  for (const page of testPages) {
    console.log(`📄 Checking: ${page.name}`);
    console.log(`   URL: ${page.url}`);

    try {
      const pageInstance = await browser.newPage();
      await pageInstance.goto(page.url, { waitUntil: 'networkidle0' });

      // Wait for client-side schema injection
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract page content
      const content = await pageInstance.evaluate(() => {
        const title = document.title;
        const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
        const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
        const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
        const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
        const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
        const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
        const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).length;
        const h1Tags = document.querySelectorAll('h1').length;
        const htmlLang = document.documentElement.getAttribute('lang');

        return {
          title,
          metaDescription,
          metaKeywords,
          canonical,
          ogTitle,
          ogDescription,
          ogType,
          twitterCard,
          twitterTitle,
          robots,
          jsonLdScripts,
          h1Tags,
          htmlLang
        };
      });

      await pageInstance.close();

      // Extract variables for scoring
      const { title, metaDescription, metaKeywords, canonical, ogTitle, ogDescription, ogType, twitterCard, twitterTitle, robots, jsonLdScripts, h1Tags, htmlLang } = content;

      // Check title
      console.log(`   ✅ Title: ${title ? 'Present' : 'Missing'} (${title?.length || 0} chars)`);

      // Check meta description
      console.log(`   ✅ Meta Description: ${metaDescription ? 'Present' : 'Missing'} (${metaDescription?.length || 0} chars)`);

      // Check meta keywords
      console.log(`   ✅ Meta Keywords: ${metaKeywords ? 'Present' : 'Missing'}`);

      // Check canonical URL
      console.log(`   ✅ Canonical URL: ${canonical ? 'Present' : 'Missing'}`);

      // Check Open Graph tags
      console.log(`   ✅ Open Graph: ${ogTitle && ogDescription && ogType ? 'Complete' : 'Incomplete'}`);

      // Check Twitter Card tags
      console.log(`   ✅ Twitter Cards: ${twitterCard && twitterTitle ? 'Present' : 'Missing'}`);

      // Check robots meta
      console.log(`   ✅ Robots Meta: ${robots ? robots : 'Using defaults'}`);

      // Check structured data
      console.log(`   ✅ JSON-LD Scripts: ${jsonLdScripts} found`);

      // Check H1 tag
      console.log(`   ✅ H1 Tags: ${h1Tags} found`);

      // Check language attributes
      console.log(`   ✅ HTML Lang: ${htmlLang || 'Missing'}`);

      // Enhanced SEO score with stricter criteria
      let score = 0;
      let maxScore = 10;

      // Title: 50-60 characters (optimal range)
      if (title && title.length >= 50 && title.length <= 60) score++;
      else if (title && title.length >= 30 && title.length <= 70) score += 0.5; // Partial credit

      // Description: 150-160 characters (optimal range)
      if (metaDescription && metaDescription.length >= 150 && metaDescription.length <= 160) score++;
      else if (metaDescription && metaDescription.length >= 120 && metaDescription.length <= 180) score += 0.5; // Partial credit

      if (metaKeywords) score++;
      if (canonical) score++;
      if (ogTitle && ogDescription && ogType) score++;
      if (twitterCard && twitterTitle) score++;
      if (robots && robots.includes('index')) score++;
      if (jsonLdScripts >= 2) score++; // Require at least 2 schema types
      else if (jsonLdScripts >= 1) score += 0.5; // Partial credit for 1 schema
      if (h1Tags === 1) score++;
      if (htmlLang === 'en') score++;

      const percentage = Math.round((score / maxScore) * 100);
      console.log(`   📊 SEO Score: ${score}/${maxScore} (${percentage}%)`);

      if (percentage >= 80) {
        console.log(`   🟢 Status: EXCELLENT`);
      } else if (percentage >= 60) {
        console.log(`   🟡 Status: GOOD`);
      } else {
        console.log(`   🔴 Status: NEEDS IMPROVEMENT`);
      }

    } catch (error) {
      console.log(`   ❌ Error fetching page: ${error.message}`);
    }

    console.log('');
  }

  await browser.close();
  console.log('🎯 SEO Check Complete!');
}

// Run the check
checkSEO().catch(console.error);