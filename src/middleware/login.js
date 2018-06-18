const { User } = require('../models');
const { success } = require('../response');
const token = require('../auth/token');

module.exports = (req, res) => {
  const userData = User.json(req.user);

  success(res, {
    data: {
      ...userData,
      token: token(req.user)
    }
  });
};
