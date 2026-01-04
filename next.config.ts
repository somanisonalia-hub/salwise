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
      {
        source: '/salary-calculator-usa',
        destination: '/en/usa-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-uk',
        destination: '/en/uk-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-ireland',
        destination: '/en/ireland-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-canada',
        destination: '/en/canada-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-australia',
        destination: '/en/australia-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-germany',
        destination: '/en/germany-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-france',
        destination: '/en/france-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-spain',
        destination: '/en/spain-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-india',
        destination: '/en/india-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-singapore',
        destination: '/en/singapore-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-netherlands',
        destination: '/en/netherlands-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-sweden',
        destination: '/en/sweden-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-switzerland',
        destination: '/en/switzerland-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-new-zealand',
        destination: '/en/new-zealand-salary-calculator',
        permanent: true,
      },
      {
        source: '/salary-calculator-south-africa',
        destination: '/en/south-africa-salary-calculator',
        permanent: true,
      },
      // Also add redirects with /en/ prefix
      {
        source: '/en/salary-calculator-usa',
        destination: '/en/usa-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-uk',
        destination: '/en/uk-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-ireland',
        destination: '/en/ireland-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-canada',
        destination: '/en/canada-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-australia',
        destination: '/en/australia-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-germany',
        destination: '/en/germany-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-france',
        destination: '/en/france-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-spain',
        destination: '/en/spain-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-india',
        destination: '/en/india-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-singapore',
        destination: '/en/singapore-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-netherlands',
        destination: '/en/netherlands-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-sweden',
        destination: '/en/sweden-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-switzerland',
        destination: '/en/switzerland-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-new-zealand',
        destination: '/en/new-zealand-salary-calculator',
        permanent: true,
      },
      {
        source: '/en/salary-calculator-south-africa',
        destination: '/en/south-africa-salary-calculator',
        permanent: true,
      },
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

      // Add compression for production assets
      const CompressionPlugin = require('compression-webpack-plugin');
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg|json)$/,
          threshold: 1024,
          minRatio: 0.8,
          compressionOptions: { level: 9 },
        })
      );
    }

    return config;
  },
};

export default nextConfig;
