const {
    getShameOnYous,
    getAllShameOnYous,
    shameDowndoot,
    createShame
} = require('../middleware').shameOnYou;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
    router.get('/api/shameonyous', getShameOnYous);
    router.get('/api/shameonyous/history', getAllShameOnYous);
    router.post('/api/shameonyous', requireAuth, createShame);
    router.post('/api/shameonyous/:shameId/downdoot', requireAuth, shameDowndoot);
};
