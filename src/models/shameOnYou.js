const Sequelize = require('sequelize');
const serialize = require('./serialize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const ShameOnYou = sequelize.define('shameOnYou', {
    description: {
      field: 'description',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    updoots: {
      field: 'downdoots',
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    active: {
      field: 'active',
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    underscored: true
  });

  ShameOnYou.json = serialize.shameOnYou;

  return ShameOnYou;
};
