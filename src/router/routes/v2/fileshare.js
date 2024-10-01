import { Router } from 'express';
import Debug from 'debug';
import fileshareService from '../../../services/fileshare.service';

const debug = Debug('app:fileshare');

const router = Router();

router.get('/file/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileshareService.getFile(id);
    res.json(file);
  } catch (error) {
    // debug(error);
    res.status(404).json({
      message: error.message,
    });
  }
});

router.post('/generate-link', async (req, res) => {
  try {
    const newFile = await fileshareService.addNewFile(req.body);
    debug(req.originalUrl);
    res.json({ link: req.baseUrl + newFile });
  } catch (error) {
    debug(error);
    res.status(400).json({
      message: 'Please check your data',
    });
  }
});

export default router;
