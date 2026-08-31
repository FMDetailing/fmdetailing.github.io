/**
 * Next.js config for FM Detailing — static export for GitHub Pages.
 *
 * The site deploys to https://<user>.github.io/FMDetailing, so in
 * production builds we prefix all routes/assets with /FMDetailing.
 * Local dev (npm run dev) runs at the root with no prefix.
 */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/FMDetailing' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static HTML export — no server needed
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,       // folder-style URLs, plays nice with Pages
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
