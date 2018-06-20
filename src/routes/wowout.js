const {
  getWowouts,
  getAllWowouts,
  wowoutUpdoot,
  createWowout
} = require('../middleware').wowout;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
  router.get('/api/wowouts', getWowouts);
  router.get('/api/wowouts/history', getAllWowouts);
  router.post('/api/wowouts', requireAuth, createWowout);
  router.post('/api/wowouts/:wowoutId/updoot', requireAuth, wowoutUpdoot);
};
