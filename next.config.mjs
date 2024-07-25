/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'https://lh3.googleusercontent.com',
              port: '',
              pathname: '/**',
            },
          ],
    }
};

export default nextConfig;
