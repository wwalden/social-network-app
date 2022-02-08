const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/ctrl.user');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/login', userCtrl.checkLogin);
router.get('/logout', userCtrl.logout);

router.get('/:id', userCtrl.showUser);
router.put('/:id', userCtrl.updateUser);


module.exports = router;
