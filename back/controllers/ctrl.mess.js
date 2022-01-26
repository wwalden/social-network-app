const Message = require("../models/message");
const User = require("../models/user");
const Comment = require("../models/comment");



// Messages Controllers

exports.showAllMess = (req, res, next) => {
  Message.findAll()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
};


exports.createMess = (req, res, next) => {
  const newMess = Message.create({
    userid: res.locals.user,
    content: req.body.content
  })
    .then((newMess) => res.status(201).json({ Message: newMess.id }))
    .catch((error) => res.status(400).json({ error }));
};

exports.showOneMess = (req, res, next) => {
  Message.findOne({ where: { id: req.params.id } })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
};


exports.updateMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({ where: { id: req.params.id } })
    const userOfMessInDb = messInDb.userid.toString();
 
    if (userOfMessInDb !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } })
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== true) {
      return res.status(400).json({ message: "not allowed" })
      }
    }
    await Message.update(
        {content: req.body.content}, {
        where : {
          id: req.params.id
        }
      })
    res.status(200).json({ message: 'Message mis à jour !', mess: req.params.id, user: userOfMessInDb, userbis: res.locals.user, newmess: req.body.content})
  } catch {
    res.status(400).json({ error})
  }
}


exports.deleteMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({ where: { id: req.params.id } })
    const userOfMessInDb = messInDb.userid.toString();
    if (userOfMessInDb !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } })
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== true) {
        return res.status(400).json({ message: "not allowed" })
      }
    }
      await Message.destroy({
          where : {
            id: req.params.id
          }
        })
      res.status(200).json({ message: 'Message supprimé !', mess: req.params.id, user: userOfMessInDb, userbis: res.locals.user})
  } catch {
    res.status(400).json({ error })
  }
}


// Likes Controllers



// Comments Controllers
// PASSER 2 PARAMETRES ? -- AVEC: http://localhost:3000/api/?mess=16&comment=23


exports.addComment = (req, res, next) => {
  const newComment = Comment.create({
    userid: req.body.userid,
    messid: req.params.id,
    content: req.body.content
  })
    .then((newComment) => res.status(201).json({ Message: newComment.id, content: newComment.content }))
    .catch((error) => res.status(400).json({ error }));
};


exports.updateComment = (req, res, next) => {
  try {
    Comment.update(
      {content: req.body.content}, {
      where : {
        id: req.params.id
      }
    })
    res.status(200).json({ message: 'Commentaire mis à jour !'})
  } catch {
    res.status(400).json({ error })
  }
};