import v1Api from './routes/v1';
import v2Api from './routes/v2';

function router(app) {
  v1Api(app);
  v2Api(app);
}

export default router;
