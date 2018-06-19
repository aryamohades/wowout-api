const {
    find,
    response
  } = require('./common');
  
  const {
    User,
    Wowout,
    Updoot
  } = require('../models');
  
  const getUpdoots = find({
    model: Updoot,
    method: 'findAll',
    response: true,
    name: 'updoots',
    include: [
      {
        model: User,
        as: 'updootGiver'
      },
      {
        model: Wowout,
        as: 'updootReceiver'
      }
    ]
  });
  
  module.exports = {
    getUpdoots
  };
  