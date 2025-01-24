/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure ESLint
  eslint: {
    // Enable ESLint for .ts and .tsx files
    dirs: ['app', 'components', 'utils'],
    ignorePatterns: [/node_modules/],
  },
};

export default nextConfig;
