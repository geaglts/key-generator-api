import { createClient } from '@libsql/client';
import envs from '../configs/env';

export default createClient({
  url: envs.turso.url,
  authToken: envs.turso.token,
});
