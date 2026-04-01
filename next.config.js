/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the standalone HTML to be served from /public
  // and handle external image domains for avatars
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unavatar.io' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: '**.twimg.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
  },
  // Needed so the iframe src works in dev mode
  async headers() {
    return [
      {
        source: '/index-standalone.html',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Type', value: 'text/html; charset=utf-8' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
