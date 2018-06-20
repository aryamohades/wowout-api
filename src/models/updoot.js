const Sequelize = require('sequelize');
const serialize = require('./serialize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const Updoot = sequelize.define('updoot', {
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    underscored: true
  });

  Updoot.json = serialize.updoot;

  return Updoot;
};
