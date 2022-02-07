const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');


router.get('/', messCtrl.showAllMess); //remettre le auth
router.post('/', auth, messCtrl.createMess);

router.get('/:messid', messCtrl.showOneMess); //remettre le auth
router.delete('/:messid', auth, messCtrl.deleteMess);
router.put('/:messid', messCtrl.updateMess); //remettre le auth


router.get('/:messid/comment', messCtrl.showComments);
router.post('/:messid/comment', messCtrl.addComment);

router.put('/:messid/comment/:commentid', messCtrl.updateComment);
//router.delete('/:messid/comment/:commentid', messCtrl.deleteComment);

//http://localhost:3000/api/?mess=16&comment=23
// ...meaning: mess/:messid/comment/:commentid


module.exports = router;