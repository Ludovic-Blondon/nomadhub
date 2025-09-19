/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Augmente la limite à 10MB pour les images
    },
  },
};

module.exports = nextConfig;
