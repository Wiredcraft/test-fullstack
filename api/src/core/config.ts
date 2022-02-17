export default () => ({
  port: parseInt(process.env.API_PORT, 10) || 3001,
  frontendUrl: process.env.FE_BASE_URL || 'http://localhost:3001',
  database: {
    host: process.env.DB_HOSTNAME,
    name: process.env.DB_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
  oauth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'this?is-a_super!secret!string',
    expiresIn: '2 days',
  },
});
