/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      remotePatterns:[
        {
            protocol:'https',
            hostname:'m.media-amazon.com'
        }
      ]
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
