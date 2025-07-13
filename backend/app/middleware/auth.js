import { shopify } from '../../../.shopify/shopify.js';
export default function applyAuthMiddleware(app) {
  app.get('/auth', async (req, res) => {
    return shopify.auth.begin({ shop: req.query.shop, callbackPath: '/auth/callback' }, req, res);
  });

  app.get('/auth/callback', async (req, res) => {
    try {
      const session = await shopify.auth.callback({ rawRequest: req, rawResponse: res });
      console.log(session);
      
      await shopify.auth.installationStores().storeCallback(session);
      const host = req.query.host;
      res.redirect(`/admin?shop=${session.shop}&host=${host}`);
    } catch (e) {
      console.error('OAuth error', e);
      res.status(500).send('Authentication failed');
    }
  });
}