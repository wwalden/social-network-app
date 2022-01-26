const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');


router.get('/', auth, messCtrl.showAllMess);
router.post('/', auth, messCtrl.createMess);

router.get('/:id', auth, messCtrl.showOneMess);
router.delete('/:id', auth, messCtrl.deleteMess);
router.put('/:id', auth, messCtrl.updateMess);


router.post('/:id/comment', messCtrl.addComment);


router.put('/comment/:id', messCtrl.updateComment);
//router.delete('/comment/:id', messCtrl.deleteComment);


module.exports = router;