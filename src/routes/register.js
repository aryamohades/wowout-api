const { register } = require('../middleware');

module.exports = (router) => {
  router.post('/api/register', register);
};
