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
  Rating
} = require('../models');

const getAuthUser = response({
  model: User,
  instance: 'user'
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

module.exports = {
  getAuthUser,
  getByUsername,
  getVideos,
  getTechnologies,
  getTags,
  getFollowers,
  getFollowing,
  getRatings
};
