/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  redirects: async () => [
    {
      source: "/",
      destination: "/auth/sign-in",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
