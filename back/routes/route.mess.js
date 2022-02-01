const express = require('express');
const router = express.Router();
const messCtrl = require('../controllers/ctrl.mess');

const auth = require('../middleware/auth');


router.get('/', messCtrl.showAllMess); //remettre le auth
router.post('/', auth, messCtrl.createMess);

router.get('/:id', messCtrl.showOneMess); //messid //remettre le auth
router.delete('/:id', auth, messCtrl.deleteMess); //messid
router.put('/:id', auth, messCtrl.updateMess);  //messid


router.post('/:id/comment', messCtrl.addComment); //messid


router.put('/:messid/comment/:commentid', messCtrl.updateComment);
//router.delete('/comment/:id', messCtrl.deleteComment);

//http://localhost:3000/api/?mess=16&comment=23


module.exports = router;