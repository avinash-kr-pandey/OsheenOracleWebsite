/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // ✅ Allow images from ANY domain (no whitelist needed)
    unoptimized: true,

    // (Optional) Domains rakhna chaho to rakh sakte ho
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
      "thumbs.dreamstime.com", // optional
    ],
  },
};

module.exports = nextConfig;
