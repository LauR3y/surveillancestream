module.exports = {
  reactStrictMode: true,
  env: {
    GQL_HOST: process.env.NEXT_PUBLIC_GQL_HOST,
  },
  images: {
    domains: ['localhost'],
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
}
