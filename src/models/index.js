const Sequelize = require('sequelize');
const fixtures = require('sequelize-fixtures');

const dbConnectionUrl = process.env.DATABASE_URL;

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
const Updoot = require('./updoot')(sequelize);
const ShameOnYou = require('./shameOnYou')(sequelize);
const Downdoot = require('./downdoot')(sequelize);

// User => Wowout
User.hasMany(Wowout, {
  as: 'wowoutsReceived',
  foreignKey: 'wowout_giver_id'
});

User.hasMany(Wowout, {
  as: 'wowoutsGiven',
  foreignKey: 'wowout_receiver_id'
});

// Wowout => User
Wowout.belongsTo(User, {
  as: 'wowoutGiver',
  foreignKey: 'wowout_giver_id'
});

Wowout.belongsTo(User, {
  as: 'wowoutReceiver',
  foreignKey: 'wowout_receiver_id'
});

// User => ShameOnYou
User.hasMany(ShameOnYou, {
  as: 'shameReceieved',
  foreignKey: 'shame_receiver_id'
});

User.hasMany(ShameOnYou, {
  as: 'shameGiven',
  foreignKey: 'shame_giver_id'
});

// ShameOnYou => User
ShameOnYou.belongsTo(User, {
  as: 'shameGiver',
  foreignKey: 'shame_giver_id'
});

ShameOnYou.belongsTo(User, {
  as: 'shameReceiver',
  foreignKey: 'shame_receiver_id'
});

// User => Updoot
User.hasOne(Updoot, {
  as: 'updootGiven',
  foreignKey: 'updoot_id'
});

// User => Downdoot
User.hasOne(Downdoot, {
  as: 'downdootGiven',
  foreignKey: 'downdoot_id'
});

// ShameOnYou => Downdoot
ShameOnYou.hasMany(Downdoot, {
  as: 'downdootsReceived',
  foreignKey: 'downdoot_id'
});

Updoot.belongsTo(Wowout, {
  as: 'wowout',
  foreignKey: 'wowout_id'
});

Downdoot.belongsTo(ShameOnYou, {
  as: 'shame',
  foreignKey: 'shame_id'
});

module.exports = {
  fixtures,
  sequelize,
  Sequelize,
  User,
  Wowout,
  Updoot,
  Downdoot,
  ShameOnYou
};
