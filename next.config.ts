import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects for URLs without locale prefix
  async redirects() {
    return [
      // Calculator redirects
      {
        source: '/salary-calculator',
        destination: '/en/salary-calculator',
        permanent: true,
      },
      {
        source: '/gross-to-net-salary',
        destination: '/en/gross-to-net-salary',
        permanent: true,
      },
      {
        source: '/take-home-pay-calculator',
        destination: '/en/take-home-pay-calculator',
        permanent: true,
      },
      {
        source: '/hourly-to-salary-calculator',
        destination: '/en/hourly-to-salary-calculator',
        permanent: true,
      },
      {
        source: '/bonus-calculator',
        destination: '/en/bonus-calculator',
        permanent: true,
      },
      {
        source: '/overtime-pay-calculator',
        destination: '/en/overtime-pay-calculator',
        permanent: true,
      },
      {
        source: '/net-to-gross-salary',
        destination: '/en/net-to-gross-salary',
        permanent: true,
      },
      // Country calculator redirects
      // Industry calculator redirects
      {
        source: '/salary-calculator-it-tech',
        destination: '/en/salary-calculator-it-tech',
        permanent: true,
      },
      {
        source: '/salary-calculator-healthcare',
        destination: '/en/salary-calculator-healthcare',
        permanent: true,
      },
      {
        source: '/salary-calculator-engineering',
        destination: '/en/salary-calculator-engineering',
        permanent: true,
      },
      // Essential pages
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/en/faq',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/en/privacy-policy',
        permanent: true,
      },
    ];
  },

  // Only enable static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),

  // Turbopack configuration for Next.js 16
  turbopack: {},

  // Experimental features for Next.js 16
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Performance optimizations
  webpack: (config: any, { buildId, dev, isServer, defaultLoaders, webpack }: any) => {
    // Existing bundle analyzer config
    if (process.env.ANALYZE === 'true' && dev) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    // Production optimizations
    if (!dev && !isServer) {
      // Enable webpack optimizations for client-side bundles
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              priority: 30,
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
