import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /*
    This file is intentionally kept minimal to avoid conflicts with the root next.config.ts.
    All primary Next.js configuration should be done in the root file.
  */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
