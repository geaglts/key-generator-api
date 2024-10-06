import { Router } from 'express';
import Debug from 'debug';
import fileshareService from '../../../services/fileshare.service';

const debug = Debug('app:fileshare');

const router = Router();

router.post('/generate-link', async (req, res) => {
  try {
    const newFile = await fileshareService.addNewFile(req.body);
    // debug(req.originalUrl);
    const link = `${req.protocol}://${req.get('host')}${newFile}`;
    res.json({ link });
  } catch (error) {
    debug(error);
    res.status(400).json({
      message: 'Please check your data',
    });
  }
});

export default router;
