/** @type {import('next').NextConfig} */
// `next dev` and `next build` both default to .next, so running a build while the
// dev server is up produces an export polluted with dev chunks. Give dev its own
// directory so the two can never collide again.
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  distDir: isDev ? '.next-dev' : '.next',
  // Emits plain HTML/CSS/JS into out/ so nginx serves it exactly as the old site was served.
  output: 'export',
  // No Node runtime in production, so the built-in image optimiser cannot run.
  images: { unoptimized: true },
  // Produces about/index.html, which nginx resolves at /about/ without extra config.
  trailingSlash: true,
};
export default nextConfig;
