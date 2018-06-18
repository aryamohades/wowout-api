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

module.exports = {
  fixtures,
  sequelize,
  Sequelize,
  User
};
