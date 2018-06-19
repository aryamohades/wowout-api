const {
  find,
  response
} = require('./common');

const {
  User,
  Wowout
} = require('../models');

const getWowouts = find({
  model: Wowout,
  method: 'findAll',
  response: true,
  name: 'wowouts',
  include: [
    {
      model: User,
      as: 'giver'
    },
    {
      model: User,
      as: 'receiver'
    }
  ]
});

module.exports = {
  getWowouts
};
