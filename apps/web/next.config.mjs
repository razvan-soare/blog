/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "next-mdx-remote"],
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
}

export default nextConfig
