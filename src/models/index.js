const Sequelize = require('sequelize');
const fixtures = require('sequelize-fixtures');

const dbConnectionUrl = process.env.DB_URL;

let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(dbConnectionUrl, {
    operatorsAliases: false,
    dialect: 'postgres'
  });
} else {
  sequelize = new Sequelize(dbConnectionUrl, {
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });
}

// Initialize models
const User = require('./user')(sequelize);
const Wowout = require('./wowout')(sequelize);

User.hasMany(Wowout, {
  as: 'wowoutsReceived',
  foreignKey: 'giver_id'
});

User.hasMany(Wowout, {
  as: 'wowoutsGiven',
  foreignKey: 'receiver_id'
});

Wowout.belongsTo(User, {
  as: 'giver',
  foreignKey: 'giver_id'
});

Wowout.belongsTo(User, {
  as: 'receiver',
  foreignKey: 'receiver_id'
});

module.exports = {
  fixtures,
  sequelize,
  Sequelize,
  User,
  Wowout
};
