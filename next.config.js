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
})
