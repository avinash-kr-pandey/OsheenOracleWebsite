/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      { protocol: "https", hostname: "osheenoracle.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
    ],
  },
};

module.exports = nextConfig;
