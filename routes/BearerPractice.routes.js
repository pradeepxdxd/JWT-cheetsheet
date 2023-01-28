const { login, regis, addTodo } = require('../controllers/BearerController');
const { bearerAuth } = require('../middleware/bearerAuth');

const router = require('express').Router();

router.post('/test/regis', regis);
router.post('/test/login', login);
router.post('/test/todo', bearerAuth, addTodo);

module.exports = router;