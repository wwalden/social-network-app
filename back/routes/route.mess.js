const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');


router.post('/', auth, messCtrl.createMess);
router.delete('/', auth, messCtrl.deleteMess);
router.put('/', auth, messCtrl.updateMess);
router.get('/', auth, messCtrl.showAllMess);

//router.post('/', auth, messCtrl.addComment);


module.exports = router;