const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

router.post('/', messCtrl.createMess);


module.exports = router;