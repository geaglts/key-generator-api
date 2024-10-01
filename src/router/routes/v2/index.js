import { Router } from 'express';
import fileshare from './fileshare';
import file from './file';

function v2Api(app) {
  const router = Router();
  app.use('/file', file);
  app.use('/api/v2', router);
  router.use('/fileshare', fileshare);

  return router;
}

export default v2Api;
