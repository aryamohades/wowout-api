const express = require('express');

// Initialize router
const router = express.Router();

// Inject routes
require('./register')(router);
require('./login')(router);
require('./user')(router);
require('./wowout')(router);
require('./shameOnYou')(router);

router.post('/api/finish', async (req, res) => {

});

module.exports = router;
