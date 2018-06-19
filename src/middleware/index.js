const requireLogin = require('./require-login');
const requireAuth = require('./require-auth');
const error = require('./error');
const login = require('./login');
const register = require('./register');
const user = require('./user');
const wowout = require('./wowout');
const updoot = require('./updoot');

module.exports = {
  requireLogin,
  requireAuth,
  error,
  login,
  register,
  user,
  wowout,
  updoot
};
