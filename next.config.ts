import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ sab ESLint errors/warnings build time pe ignore
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

export default nextConfig;
