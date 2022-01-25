const Message = require("../models/message");
const Comment = require("../models/comment");

// cookies 1h58

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
  Message.findOne()
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
};


exports.updateMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({ where: { id: req.params.id } })
    const userInDb = messInDb.userid.toString();
    if (userInDb !== res.locals.user) {
      return res.status(400).json({ message: "not allowed" })
    }
    await Message.update(
        {content: req.body.content}, {
        where : {
          id: req.params.id
        }
      })
    res.status(200).json({ message: 'Message mis à jour !', mess: req.params.id, user: userInDb, userbis: res.locals.user, newmess: req.body.content})
  } catch {
    res.status(400).json({ error})
  }
}


exports.deleteMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({ where: { id: req.params.id } })
    const userInDb = messInDb.userid.toString();
    if (userInDb !== res.locals.user) {
      return res.status(400).json({ message: "not allowed" })
    }
      await Message.destroy({
          where : {
            id: req.params.id
          }
        })
      res.status(200).json({ message: 'Message supprimé !', mess: req.params.id, user: userInDb, userbis: res.locals.user})
  } catch {
    res.status(400).json({ error })
  }
}


// Likes Controllers



// Comments Controllers

exports.addComment = (req, res, next) => {
  const newComment = Comment.create({
    userid: req.body.userid,
    content: req.body.content
  })
    .then((newComment) => res.status(201).json({ Message: newComment.id }))
    .catch((error) => res.status(400).json({ error }));
};



