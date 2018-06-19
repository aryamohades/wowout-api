const {
    getShameOnYous
} = require('../middleware').shameOnYou;

const { requireAuth } = require('../middleware');

module.exports = (router) => {
    router.get('/api/shameonyous', getShameOnYous);
};
