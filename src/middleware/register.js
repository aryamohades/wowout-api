const {
  validate,
  create
} = require('./common');

const { User } = require('../models');
const token = require('../auth/token');

module.exports = [
  validate({
    fields: {
      email: true,
      username: true,
      password: true
    }
  }),
  create({
    model: User,
    name: 'user',
    response: true,
    serialize: (user) => ({
      user: User.json(user),
      token: token(user)
    })
  })
];
