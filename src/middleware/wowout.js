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
      as: 'wowoutGiver'
    },
    {
      model: User,
      as: 'wowoutReceiver'
    }
  ]
});

module.exports = {
  getWowouts
};
