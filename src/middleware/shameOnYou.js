const {
    find,
    response
  } = require('./common');
  
  const {
    User,
    ShameOnYou
  } = require('../models');
  
  const getShameOnYous = find({
    model: ShameOnYou,
    method: 'findAll',
    response: true,
    name: 'shameonyous',
    include: [
      {
        model: User,
        as: 'shameGiver'
      },
      {
        model: User,
        as: 'shameReceiver'
      }
    ]
  });
  
  module.exports = {
    getShameOnYous
  };
  