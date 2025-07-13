// ESM version
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from root .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  mongoUri: process.env.MONGO_URI,
  shopifyApiKey: process.env.SHOPIFY_API_KEY,
  shopifySecret: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES,
  host: process.env.HOST,
};
