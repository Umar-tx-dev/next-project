/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "i.imgur.com"], // Add the domains of your external image sources
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://85c8-182-176-78-163.ngrok-free.app/api/:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
