import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { Layout, CookieConsent } from "../components";
import Script from "next/script";
import "./globals.css";

// Optimize font loading with minimal weights for performance
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false, // Disable preload for better LCP
  fallback: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false, // Disable preload for better LCP
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  other: {
    'google-site-verification': '43vJJoR_yHx5bfRFM23A_Sz1OV1ZXbYoGFwcfUB3Z7c',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Critical performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload critical resources for instant loading */}
        <link rel="modulepreload" href="/_next/static/chunks/framework.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
        <link rel="preload" href="/favicon.ico" as="image" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for faster connections */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Optimize rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <Layout>{children}</Layout>

        {/* Google Consent Mode v2 - Must load before ads for AdSense approval */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', 'G-YW7PFNVTP7');
            `
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-YW7PFNVTP7`}
          strategy="afterInteractive"
        />

        {/* Ultra-lightweight CCPA Your Privacy Choices - AdSense Approved */}
        <Script defer
          dangerouslySetInnerHTML={{
            __html: `
              window.googleConsentCallback = function(c) { gtag('consent', 'update', c); };
              var isCalifornia = /California|CA/i.test(navigator.userAgent) ||
                               (navigator.language === 'en-US' && Intl.DateTimeFormat().resolvedOptions().timeZone.includes('America/Los_Angeles'));

              setTimeout(function() {
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', showCCPAChoices);
                } else {
                  showCCPAChoices();
                }
              }, 2000);

              function showCCPAChoices() {
                if (!document.body || localStorage.getItem('ccpaChoiceMade')) return;

                var d = document.createElement('div');
                d.innerHTML = '<div style="position:fixed;bottom:20px;right:20px;background:#fff;border:1px solid #e5e7eb;padding:12px;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.1);font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;max-width:280px;font-size:12px"><h3 style="margin:0 0 8px 0;font-size:13px;font-weight:600;color:#1f2937">Your Privacy Choices</h3><p style="margin:0 0 12px 0;font-size:11px;color:#374151;line-height:1.4">As a CA resident, you can opt out of sale/sharing of personal info for targeted ads. <a href="/en/privacy-policy" style="color:#3b82f6;text-decoration:underline">Privacy Policy</a>.</p><div style="display:flex;gap:6px"><button onclick="ccpaOptOut()" style="background:#3b82f6;color:white;border:none;padding:6px 12px;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer;flex:1">Opt Out</button><button onclick="ccpaAccept()" style="background:#f9fafb;color:#374151;border:1px solid #d1d5db;padding:6px 12px;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer;flex:1">Accept</button></div></div>';
                document.body.appendChild(d);
              }

              function ccpaOptOut() {
                localStorage.setItem('ccpaChoiceMade', 'true');
                localStorage.setItem('ccpaOptOut', 'true');
                localStorage.setItem('ccpaOptOutDate', new Date().toISOString());
                window.googleConsentCallback({ad_storage:'denied', ad_personalization:'denied'});
                document.querySelector('[style*="position:fixed"][style*="bottom:20px"]').remove();
              }

              function ccpaAccept() {
                localStorage.setItem('ccpaChoiceMade', 'true');
                window.googleConsentCallback({ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted'});
                document.querySelector('[style*="position:fixed"][style*="bottom:20px"]').remove();
              }
            `
          }}
        />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5200046884352893"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Service Worker Registration */}
        <Script id="service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => console.log('SW registered'))
                  .catch(error => console.log('SW registration failed'));
              });
            }
          `}
        </Script>

        {/* Cookie Consent Popup */}
        <CookieConsent />
      </body>
    </html>
  );
}
