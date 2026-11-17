/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'nubimart.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/store-list',
        destination: '/stores',
        permanent: true,
      },
      {
        source: '/store-list/:path*',
        destination: '/stores',
        permanent: true,
      },
      {
        source: '/evercompare',
        destination: '/price-comparison',
        permanent: true,
      },
      {
        source: '/sell-on-nubimart',
        destination: '/become-seller',
        permanent: true,
      },
      {
        source: '/help-centre',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/return-exchange-policy',
        destination: '/terms',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
