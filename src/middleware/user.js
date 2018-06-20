const axios = require('axios');
const uuid = require('uuid/v4');

const {
  find,
  response
} = require('./common');
const {
  User,
  Technology,
  Video,
  Organization,
  Tag,
  Rating,
  Wowout,
  Updoot
} = require('../models');

const giftbitKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ==.ZFE0VjdQVVAyY2laOExuTkRjMkxRK1BrQnJkNXVUc25OUUJ4TWVKNU5DTzVJOTl1Mmw5MERrWHVTcGpNaVFuVkZGSXlaZ244di9Wdm5QUVBnbE9lM0JWTUx2V2ZTTFNsdFVIRkxkODlTb2ZTVDBMa0k0emg5cXFsU2k3ZzQzZUI=.yKQr7BbZ3EHTCj6WL8Jbgr9MCm6ZtjrGdAGK2iJyPcs='

const getAuthUser = async (req, res, next) => {
  try {
    const updoot = await req.user.getUpdootGiven();
    const wowoutsReceived = await req.user.getWowoutsReceived();
    const wowoutsGiven = await req.user.getWowoutsGiven();

    res.status(200).send({
      user: req.user,
      updoot,
      wowoutsReceived,
      wowoutsGiven
    });
  } catch (e) {
    res.status(500).send({
      message: 'Something went wrong: ' + e.message
    });
  }
};

const getUserWowouts = find({
  model: Wowout,
  name: 'wowouts',
  response: true,
  from: {
    instance: 'user',
    method: 'getWowouts'
  }
});

const getUserUpdoots = find({
  model: Updoot,
  name: 'updoot',
  response: true,
  from: {
    instance: 'user',
    method: 'getUpdoot'
  }
});

const getByUsername = find({
  model: User,
  name: 'user',
  method: 'findOne',
  response: true,
  attributes: [
    'username',
    'name',
    'location',
    'profileImage',
    'createdAt'
  ],
  query: {
    username: {
      params: true
    }
  },
  include: [
    {
      model: Technology,
      as: 'technologies',
      attributes: [
        'name',
        'search',
        'image'
      ],
      through: { attributes: [] }
    },
    {
      model: Organization,
      as: 'organizations',
      attributes: [
        'name',
        'search',
        'profileImage'
      ],
      through: { attributes: [] }
    }
  ]
});

const getVideos = find({
  model: Video,
  name: 'videos',
  response: true,
  attributes: [
    'videoId',
    'title',
    'description',
    'episode',
    'runtime',
    'createdAt'
  ],
  from: {
    instance: 'user',
    method: 'getVideos'
  }
});

const getTechnologies = find({
  model: Technology,
  name: 'technologies',
  response: true,
  includeIgnoreAttributes: false,
  attributes: [
    'name',
    'search',
    'image'
  ],
  from: {
    instance: 'user',
    method: 'getTechnologies'
  }
});

const getTags = find({
  model: Tag,
  name: 'tags',
  response: true,
  includeIgnoreAttributes: false,
  attributes: [
    'name',
    'search'
  ],
  from: {
    instance: 'user',
    method: 'getTags'
  }
});

const getFollowers = find({
  model: User,
  name: 'followers',
  response: true,
  includeIgnoreAttributes: false,
  attributes: [
    'username',
    'profileImage'
  ],
  from: {
    instance: 'user',
    method: 'getFollowers'
  }
});

const getFollowing = find({
  model: User,
  name: 'following',
  response: true,
  includeIgnoreAttributes: false,
  attributes: [
    'username',
    'profileImage'
  ],
  from: {
    instance: 'user',
    method: 'getFollowing'
  }
});

const getRatings = find({
  model: Rating,
  name: 'ratings',
  response: true,
  attributes: [
    'score',
    'review',
    'createdAt'
  ],
  from: {
    instance: 'user',
    method: 'getRatings'
  }
});

const getUsers = find({
  model: User,
  name: 'users',
  method: 'findAll',
  response: true,
  include: [
    {
      model: Wowout,
      as: 'wowoutsReceived',
      attributes: [
        'description'
      ]
    },
    {
      model: Wowout,
      as: 'wowoutsGiven',
      attributes: [
        'description'
      ]
    }
  ]
});

const redeemPoints = async (req, res) => {
  const cost = req.body.cost;

  try {
    await axios({
      method: 'post',
      url: 'https://api-testbed.giftbit.com/papi/v1/campaign',
      data: {
        subject: 'Your Kibo WOWOUT Reward',
        message: 'Enjoy!',
        delivery_type: 'GIFTBIT_EMAIL',
        contacts: [{ email: 'arya.mohades@kibocommerce.com', firstname: 'Arya', lastname: 'Mohades' }],
        price_in_cents: 2500,
        brand_codes: ['amazonus'],
        id: uuid(),
        expiry: '2018-06-29'
      },
      headers: {
        Authorization: 'Bearer ' + giftbitKey,
        'Content-Type': 'application/json'
      }
    });

    await req.user.decrement('points', { by: cost });

    res.status(200).send({
      message: 'Redeemed points successfully'
    });

  } catch (e) {
    res.status(500).send({
      error: e.message
    });
  }

};

module.exports = {
  getUsers,
  getAuthUser,
  getByUsername,
  redeemPoints
};
