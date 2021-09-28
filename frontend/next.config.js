module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '127.0.0.1'],
    path: `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/_next/image/`,
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
}
