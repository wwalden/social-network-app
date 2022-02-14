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


//router.get('/:messid', auth, messCtrl.showOneMess);
//router.put('/:messid', messCtrl.updateMess); //remettre le auth
//router.put('/:messid/comment/:commentid', messCtrl.updateComment);


//http://localhost:3000/api/?mess=16&comment=23
// ...meaning: mess/:messid/comment/:commentid


module.exports = router;