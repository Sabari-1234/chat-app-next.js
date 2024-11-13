/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
export default nextConfig;

// import {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
// } from "next/constants.js";
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//         remotePatterns: [
//             {
//               protocol: 'https',
//               hostname: 'https://lh3.googleusercontent.com',
//               port: '',
//               pathname: '/**',
//             },
//           ],
//     }
// };

// const nextConfigFunction = async (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
//     const withPWA = (await import("@ducanh2912/next-pwa")).default({
//       dest: "public",
//     });
//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };
// export default nextConfigFunction;
