import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { shopify } from '../../.shopify/shopify.js';
import applyAuthMiddleware from './middleware/auth.js';
import verifyRequest from './middleware/verify-request.js';
import timerRoutes from './routes/timerRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URI="mongodb+srv://jith97972:N4tCGHXFeBfZokmf@cluster0.ah1zlkm.mongodb.net/nextJS?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI)
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