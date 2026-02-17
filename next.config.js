/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, 
  basePath: "/my-app",        
  assetPrefix: "/my-app/", 
  trailingSlash: true,
};

module.exports = nextConfig;
