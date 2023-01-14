const { thapaRegisController, thapaLoginController, thapaLogoutController } = require('../controllers/thapaController');
const thapaAuth = require('../middleware/thapaAuth');

const router = require('express').Router();

router.post('/thapa-regis', thapaRegisController);
router.post('/thapa-login', thapaLoginController);
router.get('/thapa-logout', thapaAuth, thapaLogoutController);

module.exports = router;