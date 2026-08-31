/**
 * Next.js config for FM Detailing — static export for GitHub Pages.
 *
 * The site deploys at the ROOT of https://fmdetailing.github.io
 * (repo `fmdetailing.github.io` under the `fmdetailing` org), so no
 * basePath is needed. If it ever moves to a sub-path deploy
 * (e.g. <user>.github.io/FMDetailing), set basePath to '/FMDetailing'
 * for production builds.
 */
const basePath = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static HTML export — no server needed
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,       // folder-style URLs, plays nice with Pages
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
