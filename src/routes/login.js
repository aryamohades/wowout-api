const {
  login,
  requireLogin
} = require('../middleware');

const { success } = require('../response');
const { User } = require('../models');
const token = require('../auth/token');

module.exports = (router) => {
  router.post('/api/login', requireLogin, login);
};
