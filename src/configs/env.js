import 'dotenv/config';

const variables = {
  isDev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  turso: {
    url: process.env.TURSO_DATABASE_URL,
    token: process.env.TURSO_AUTH_TOKEN,
  },
};

export default variables;
