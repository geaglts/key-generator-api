import { Router } from 'express';
import keyGeneratorRoutes from './keyGenerator.routes';

function v1Api(app) {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/key-generator', keyGeneratorRoutes);

  return router;
}

export default v1Api;
