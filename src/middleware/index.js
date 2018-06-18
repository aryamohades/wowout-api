const requireLogin = require('./require-login');
const requireAuth = require('./require-auth');
const error = require('./error');
const register = require('./register');
const user = require('./user');

module.exports = {
  requireLogin,
  requireAuth,
  error,
  register,
  user
};
