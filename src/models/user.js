const Sequelize = require('sequelize');
const serialize = require('./serialize');
const credentials = require('../auth/credentials');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      field: 'password',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    hasWowout: {
      field: 'has_wowout',
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasShame: {
      field: 'has_shame',
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      field: 'image',
      type: DataTypes.STRING,
      defaultValue: 'user.jpg'
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    points: {
      field: 'points',
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: [
          'email',
        ]
      }
    ],
    timestamps: false,
    underscored: true
  });

  User.beforeCreate((data) => {
    data.email = credentials.normalizeEmail(data.email);

    return credentials.encrypt(data.password).then((hashedPw) => {
      data.password = hashedPw;
    });
  });

  User.json = serialize.user;

  return User;
};
