// Mettre des 401 à la place des 400 afin de récupérer les messages JSON des erreurs 


const Message = require("../models/message");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");

User.hasMany(Message, {foreignKey: 'userId'});
Message.belongsTo(User);

Message.hasMany(Comment, {foreignKey: 'messageid'});
Comment.belongsTo(Message);

User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User);


// Messages Controllers

exports.showAllMess = async (req, res, next) => {

  const userInDb = await User.findOne({ where: { id: res.locals.user } })
  if (!userInDb) {
    return res.status(400).json({ message: "not allowed" })
  }

  Message.findAll({
    include: [{
      model: User,
      required: true
     }],
     order: [['updatedAt', 'DESC']]
  })
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


/*
exports.showOneMess = async (req, res, next) => {

  const userInDb = await User.findOne({ where: { id: res.locals.user } })
  if (!userInDb) {
    return res.status(400).json({ message: "not allowed" })
  }


  Message.findOne({ where: { id: req.params.messid } })
    .then(message => res.status(200).json(message.content))
    .catch(error => res.status(400).json({ error }));
};
*/

exports.updateMess = async (req, res, next) => {
  try {
    /*
    const messInDb = await Message.findOne({ where: { id: req.params.id } })
    const userOfMessInDb = messInDb.userid.toString();
 
    if (userOfMessInDb !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } })
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== true) {
      return res.status(400).json({ message: "not allowed" })
      }
    }
    */
    await Message.update(
        {content: req.body.content}, {
        where : {
          id: req.params.messid
        }
      })
    res.status(200).json({ message: 'Message mis à jour !'}) //, mess: req.params.messid, user: userOfMessInDb, userbis: res.locals.user, newmess: req.body.content})
  } catch {
    res.status(400).json({ error})
  }
}

 
exports.deleteMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({ where: { id: req.params.messid } })
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
            id: req.params.messid
          }
        })
      res.status(200).json({ message: 'Message supprimé !' })
  } catch {
    res.status(400).json({ error: "not allowed" })
  }
}


// Likes Controllers



// Comments Controllers
// PASSER 2 PARAMETRES ? -- AVEC: http://localhost:3000/api/?mess=16&comment=23



exports.showComments = async (req, res, next) => {


  const userInDb = await User.findOne({ where: { id: res.locals.user } })
  if (!userInDb) {
    return res.status(400).json({ message: "not allowed" })
  }

  Comment.findAll({
    where: {messageid: req.params.messid},
    include: [{
      model: User,
      required: true
     }]
  })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};



exports.addComment = (req, res, next) => {
  const newComment = Comment.create({
    userid: res.locals.user,
    messageid: req.params.messid,
    content: req.body.content
  })
    .then((newComment) => res.status(201).json({ Comment: newComment.id, content: newComment.content }))
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




exports.deleteComment = async (req, res, next) => {
  try {
    
    const commInDb = await Comment.findOne({ where: { id: req.params.commentid } })
    const userOfCommInDb = commInDb.userid.toString();
    
    if (userOfCommInDb !== res.locals.user) {
      return res.status(400).json({ message: "not allowed" })

    }

    await Comment.destroy({
      where : {
        id: req.params.commentid
      }
    })
    res.status(200).json({ message: 'Commentaire supprimé !' })
  } catch {
    res.status(400).json({ error: "not allowed" })
  }
};



exports.likeMess = async (req, res, next) => {
  try {
    console.log(res.locals.user);
    const UserInLikes = await Like.findOne({ where: { messid: req.params.messid, userid: res.locals.user} })
    
    let userAlreadyLiked;
    if (UserInLikes) {
      userAlreadyLiked = true;
    } else {
      userAlreadyLiked = false
    }

    console.log(userAlreadyLiked);


    if (!userAlreadyLiked) {
      await Message.increment(
        {likes: 1}, {
          where : {
            id: req.params.messid
          }
        })

        await Likes.create({
          messid: req.params.messid,
          userid: res.locals.user
        })



    } else {
      await Message.increment(
        {likes: -1}, {
          where : {
            id: req.params.messid
          }
        })
    }

      res.status(200).json({ message: 'Message mis à jour!' })
  } catch {
    res.status(400).json({ error: "not allowed" })
  }
};
