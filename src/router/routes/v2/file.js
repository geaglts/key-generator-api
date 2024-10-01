import { Router } from 'express';
import fileshareService from '../../../services/fileshare.service';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileshareService.getFile(id);

    const fileContent = Buffer.from(file.content);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${file.name}.${file.type}`,
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(fileContent);
  } catch (error) {
    // debug(error);
    res.status(404).json({
      message: error.message,
    });
  }
});

export default router;
