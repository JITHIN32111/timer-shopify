import express from 'express';
import { CountdownTimer } from '../db/models/CountdownTimer.js';
const router = express.Router();

router.post('/create', async (req, res) => {
  const { shop } = res.locals.shopify.session;
  const timer = new CountdownTimer({ ...req.body, shop });
  await timer.save();
  res.status(201).json({ message: 'Timer created' });
});

router.get('/', async (req, res) => {
  const { shop } = res.locals.shopify.session;
  const timers = await CountdownTimer.find({ shop });
  res.json(timers);
});

export default router;