/* eslint-disable no-process-exit, no-console */
const http = require('http');
const path = require('path');
const app = require('./app');
const models = require('./models');
const log = require('./logger');

const start = async () => {
  try {
    await models.sequelize.authenticate();

    await models.sequelize.sync({ force: true });

    const port = process.env.PORT;

    // await models.fixtures.loadFiles('models/fixtures/*.json', models);

    const server = http.createServer(app);

    server.listen(port, () => {
      process.on('SIGINT', stop);

      process.on('SIGTERM', stop);

      log.info('[api] Server listening on ' + port);
    });
  } catch (err) {
    throw err;
  }
};

async function stop() {
  try {
    log.info('[api] Stopping server gracefully');

    await models.sequelize.close();

    process.exit(0);
  } catch (err) {
    log.error('[api] Disconnect from database failed: ' + err.message);

    process.exit(1);
  }
}

start();
