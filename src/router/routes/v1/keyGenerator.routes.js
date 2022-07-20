import { Router } from 'express';
import KeyGenerator from '../../../classes/KeyGenerator';

const router = Router();

router.get('/random-key', (req, res) => {
  const { size = 1 } = req.query;
  try {
    const keyGenerator = new KeyGenerator(size);
    keyGenerator.generateKey();
    res.json({ key: keyGenerator.key, size: keyGenerator.size });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.get('/random-number', (req, res) => {
  const { limit = 10 } = req.query;
  try {
    res.json(KeyGenerator.randomNumber(limit));
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

export default router;
