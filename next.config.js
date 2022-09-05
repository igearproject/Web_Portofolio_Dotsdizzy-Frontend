/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com','localhost','127.0.0.1'],
  },
}

module.exports = nextConfig
