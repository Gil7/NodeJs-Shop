const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.get('/login', AuthController.getLogin);

router.post('/login', AuthController.postLogin);

router.post('/logout', AuthController.postLogout);

module.exports = router;