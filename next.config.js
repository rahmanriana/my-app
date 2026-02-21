/** @type {import('next').NextConfig} */
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  images: { unoptimized: true },
  ...(isGithubPagesBuild
    ? {
        output: "export",
        basePath: "/my-app",
        assetPrefix: "/my-app/",
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
