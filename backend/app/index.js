import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { shopify } from '../../.shopify/shopify.js';
import applyAuthMiddleware from './middleware/auth.js';
import verifyRequest from './middleware/verify-request.js';
import timerRoutes from './routes/timerRoutes.js';
import { config } from '../../config/config.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

applyAuthMiddleware(app);

app.use('/api/timers', verifyRequest, timerRoutes);

app.get('/api/whoami', verifyRequest, (req, res) => {
  const session = res.locals.shopify.session;
  res.status(200).json({ shop: session.shop });
});

app.get('/logout', verifyRequest, async (req, res) => {
  const session = res.locals.shopify.session;
  if (session) await shopify.sessionStorage.deleteSession(session.id);
  res.redirect('/');
});

app.listen(3000, () => console.log('Backend running at http://localhost:3000'))