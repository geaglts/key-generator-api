import { Router } from 'express';
import * as secureService from '../../../services/secure.service';
import fileshareService from '../../../services/fileshare.service';

const router = Router();

router.post('/secure/validate-key', async (req, res) => {
  try {
    const file = await fileshareService.getFile(req.body.id);
    const canDownload = await secureService.decrypt(req.body.key, file.passkey);
    if (canDownload) {
      const fileContent = Buffer.from(file.content).toString('base64');
      res.json({ base64: fileContent, fileName: `${file.name}.${file.type}` });
    } else {
      res
        .status(403)
        .json({ message: 'No tienes acceso a este archivo, verifica tus datos.' });
    }
  } catch (error) {
    // debug(error);
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileshareService.getFile(id);
    if (file && file.passkey.length > 0) {
      res.render('passkeyRequest', { id });
    } else {
      const fileContent = Buffer.from(file.content);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${file.name}.${file.type}`,
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(fileContent);
    }
  } catch (error) {
    // debug(error);
    res.status(404).json({
      message: error.message,
    });
  }
});

export default router;
