const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  future: {
    webpack5: false,
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty', // webpack4 era solution
    }

    return config
  },
})
