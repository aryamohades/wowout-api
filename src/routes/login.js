const { requireLogin } = require('../middleware');
const { success } = require('../response');
const { User } = require('../models');
const token = require('../auth/token');

module.exports = (router) => {
  router.post('/api/login', requireLogin, (req, res) => {
    const responseData = User.json(req.user);

    success(res, {
      data: {
        ...responseData,
        token: token(req.user)
      }
    });
  });
};
