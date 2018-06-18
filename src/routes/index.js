const express = require('express');

// Initialize router
const router = express.Router();

// Inject routes
require('./register')(router);
require('./login')(router);
require('./user')(router);

module.exports = router;
