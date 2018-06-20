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

const getAllShameOnYous = find({
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
  ],
  order: [
    ['updoots', 'DESC']
  ]
});

const shameDowndoot = async (req, res) => {
  const downdoot = await req.user.getDowndootGiven();

  if (downdoot) {
    const previousShame = await downdoot.getShame();

    await previousShame.decrement('updoots');

    await downdoot.destroy();
  }

  await req.user.createDowndootGiven({
    shame_id: req.params.shameId
  });

  const newShame = await ShameOnYou.findOne({
    where: {
      id: req.params.shameId
    }
  });

  await newShame.increment('updoots');

  res.status(200).send({
    message: 'Updated downdoots'
  });
};

const createShame = async (req, res) => {
  const newShame = await ShameOnYou.create({
    shame_giver_id: req.user.id,
    shame_receiver_id: req.body.userId,
    description: req.body.description
  });

  return res.status(200).send({
    message: 'Shame created'
  });
};

module.exports = {
  getShameOnYous,
  getAllShameOnYous,
  shameDowndoot,
  createShame
};
