/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/auth/signIn',
      permanent: true
    }
  ]
}

module.exports = nextConfig
