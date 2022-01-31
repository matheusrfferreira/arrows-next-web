module.exports = {
  reactStrictMode: true,
  env:{
    API_KEY: process.env.API_KEY
  },
  async redirects() {
    return [
        {
            source: '/',
            destination: '/users',
            permanent: true,
        },
    ]
  },
}
