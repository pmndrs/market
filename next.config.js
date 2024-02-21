const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack5: false,

  webpack: (config, { isServer }) => {
    // Fixes draco
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    return config
  },
})
