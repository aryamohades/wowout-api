const Sequelize = require('sequelize');
const serialize = require('./serialize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const Updoot = sequelize.define('updoot', {
    updootId: {
      field: 'updoot_id',
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
          'updoot_id',
        ]
      }
    ],
    timestamps: false,
    underscored: true
  });

  Updoot.json = serialize.updoot;

  return Updoot;
};
