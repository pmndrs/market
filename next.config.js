const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
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
