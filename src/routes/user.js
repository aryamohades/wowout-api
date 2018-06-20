const {
  getAuthUser,
  getUsers,
  redeemPoints
} = require('../middleware').user;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
  router.get('/api/me', [
    requireAuth,
    getAuthUser
  ]);

  router.post('/api/redeem', requireAuth, redeemPoints);

  router.get('/api/users', getUsers);
};
