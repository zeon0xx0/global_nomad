// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
//   },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
