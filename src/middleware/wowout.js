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
  ],
  query: {
    active: {
      value: true
    }
  },
  order: [
    ['updoots', 'DESC']
  ]
});

const getAllWowouts = find({
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
  ],
  order: [
    ['updoots', 'DESC']
  ]
});

const wowoutUpdoot = async (req, res) => {
  const updoot = await req.user.getUpdootGiven();

  if (updoot) {
    const previousWowout = await updoot.getWowout();

    await previousWowout.decrement('updoots');

    await updoot.destroy();
  }

  await req.user.createUpdootGiven({
    wowout_id: req.params.wowoutId
  });

  const newWowout = await Wowout.findOne({
    where: {
      id: req.params.wowoutId
    }
  });

  await newWowout.increment('updoots');

  res.status(200).send({
    message: 'Updated updoot'
  });
};

const createWowout = async (req, res) => {
  const newWowout = await Wowout.create({
    wowout_giver_id: req.user.id,
    wowout_receiver_id: req.body.userId,
    description: req.body.description
  });

  res.status(200).send({
    message: 'Wowout created'
  });
};

module.exports = {
  getWowouts,
  getAllWowouts,
  wowoutUpdoot,
  createWowout
};
