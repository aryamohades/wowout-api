const {
  getAuthUser,
  getUsers
} = require('../middleware').user;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
  router.get('/api/me', [
    requireAuth,
    getAuthUser
  ]);

  router.get('/api/users', getUsers);
};
