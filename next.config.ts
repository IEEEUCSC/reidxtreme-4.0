/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
    ],
  },

  assetPrefix: "",
  basePath: "",
  output: "export",
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/register",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
