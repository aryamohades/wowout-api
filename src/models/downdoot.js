const Sequelize = require('sequelize');
const serialize = require('./serialize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const Downdoot = sequelize.define('downdoot', {
    downdootId: {
      field: 'downdoot_id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
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
          'downdoot_id',
        ]
      }
    ],
    timestamps: false,
    underscored: true
  });

  Downdoot.json = serialize.downdoot;

  return Downdoot;
};
