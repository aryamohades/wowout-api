const {
  getWowouts
} = require('../middleware').wowout;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
  router.get('/api/wowouts', getWowouts);
};
