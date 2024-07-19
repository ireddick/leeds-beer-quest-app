/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'leedsbeer.info',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
};

export default nextConfig;
