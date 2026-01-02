import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Enable trailing slash for static export
  trailingSlash: true,

  // Images optimization disabled for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Experimental features for Next.js 16
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      if (process.env.NODE_ENV === 'development') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true,
          })
        );
      }
      return config;
    },
  }),

  // Headers for performance (disabled for static export)
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/static/(.*)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },

  // Enable static export output
  output: 'export',
};

export default nextConfig;
