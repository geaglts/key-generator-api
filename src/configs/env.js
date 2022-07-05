import 'dotenv/config';

const variables = {
  isDev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
};

export default variables;
