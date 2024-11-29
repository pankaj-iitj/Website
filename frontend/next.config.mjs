/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  trailingSlash:true,
  basePath: "/~pyadav",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
