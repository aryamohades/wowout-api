const Sequelize = require('sequelize');
const serialize = require('./serialize');
const credentials = require('../auth/credentials');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      field: 'username',
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
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: [
          'email',
          'username'
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
