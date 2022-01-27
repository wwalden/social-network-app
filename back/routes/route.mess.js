const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');


router.get('/', auth, messCtrl.showAllMess);
router.post('/', auth, messCtrl.createMess);

router.get('/:id', auth, messCtrl.showOneMess); //messid
router.delete('/:id', auth, messCtrl.deleteMess); //messid
router.put('/:id', auth, messCtrl.updateMess);  //messid


router.post('/:id/comment', messCtrl.addComment); //messid


router.put('/:messid/comment/:commentid', messCtrl.updateComment);
//router.delete('/comment/:id', messCtrl.deleteComment);

//http://localhost:3000/api/?mess=16&comment=23


module.exports = router;