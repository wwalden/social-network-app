const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');

router.get('/', auth, messCtrl.showAllMess);
router.post('/', auth, messCtrl.createMess);
router.delete('/:messid', auth, messCtrl.deleteMess);

router.get('/:messid/comment', auth, messCtrl.showComments); 
router.post('/:messid/comment', auth, messCtrl.addComment);
router.delete('/:messid/comment/:commentid', auth, messCtrl.deleteComment);

router.post('/:messid/like', auth, messCtrl.likeMess);
router.get('/:messid/like', auth, messCtrl.getLikeStatus);

module.exports = router;