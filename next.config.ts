/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "osheenoracle.com",
      "encrypted-tbn0.gstatic.com",
      "picsum.photos",
      "via.placeholder.com",
      "images.unsplash.com",
      "img.freepik.com",
      "www.shutterstock.com",
      "i.pravatar.cc",
      "cdn.pixabay.com",
    ],
  },
};

module.exports = nextConfig;
