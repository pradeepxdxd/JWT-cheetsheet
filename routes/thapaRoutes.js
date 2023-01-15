const { thapaRegisController, thapaLoginController, thapaLogoutController, thapaUpdateUser } = require('../controllers/thapaController');
const {thapaAuth, thapaEdit} = require('../middleware/thapaAuth');

const router = require('express').Router();

router.post('/thapa-regis', thapaRegisController);
router.post('/thapa-login', thapaLoginController);
router.get('/thapa-logout', thapaAuth, thapaLogoutController);
router.put('/thapa-editUser/:id', thapaEdit, thapaUpdateUser);

module.exports = router;