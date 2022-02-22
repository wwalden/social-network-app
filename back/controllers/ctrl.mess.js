const Message = require("../models/message");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User);

Message.hasMany(Comment, { foreignKey: "messageid" });
Comment.belongsTo(Message);

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User);

Message.hasMany(Like, { foreignKey: "messid" });
Like.belongsTo(Message);


//Messages Controllers
exports.showAllMess = async (req, res, next) => {
  const userInDb = await User.findOne({ where: { id: res.locals.user } });
  if (!userInDb) {
    return res.status(401).json({ message: "not allowed" });
  }
  Message.findAll({
    include: [
      {
        model: User,
        required: true,
      },
      {
        model: Like,
        required: false,
        attributes: {
          exclude: ["Likes.messageId"],
        },
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.createMess = (req, res, next) => {
  const newMess = Message.create({
    userid: res.locals.user,
    content: req.body.content,
  })
    .then((newMess) => res.status(201).json({ Message: newMess.id }))
    .catch((error) => res.status(404).json({ error }));
};


exports.deleteMess = async (req, res, next) => {
  try {
    const messInDb = await Message.findOne({
      where: { id: req.params.messid },
    });
    const userOfMessInDb = messInDb.userid.toString();
    if (userOfMessInDb !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } });
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== "Admin") {
        return res.status(401).json({ message: "not allowed" });
      }
    }

    await Message.destroy({
      where: {
        id: req.params.messid,
      },
    });
    res.status(200).json({ message: "Message supprimé !" });
  } catch {
    res.status(404).json({ error: "not found" });
  }
};


//Comments Controllers
exports.showComments = async (req, res, next) => {
  const userInDb = await User.findOne({ where: { id: res.locals.user } });
  if (!userInDb) {
    return res.status(401).json({ message: "not allowed" });
  }
  Comment.findAll({
    where: { messageid: req.params.messid },
    include: [
      {
        model: User,
        required: true,
      },
    ],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};

exports.addComment = (req, res, next) => {
  const newComment = Comment.create({
    userid: res.locals.user,
    messageid: req.params.messid,
    content: req.body.content,
  })
    .then((newComment) =>
      res.status(201).json({ Comment: newComment.id, content: newComment.content })
    )
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commInDb = await Comment.findOne({
      where: { id: req.params.commentid },
    });
    const userOfCommInDb = commInDb.userid.toString();
    if (userOfCommInDb !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } });
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== "Admin") {
        return res.status(401).json({ message: "not allowed" });
      }
    }
    await Comment.destroy({
      where: {
        id: req.params.commentid,
      },
    });
    res.status(200).json({ message: "Commentaire supprimé !" });
  } catch {
    res.status(404).json({ error: "not found" });
  }
};


// Likes Controllers
exports.likeMess = async (req, res, next) => {
  try {
    const UserInLikes = await Like.findOne({
      where: { messid: req.params.messid, userid: res.locals.user },
    });
    let userAlreadyLiked;
    if (UserInLikes) {
      userAlreadyLiked = true;
    } else {
      userAlreadyLiked = false;
    }
    if (!userAlreadyLiked) {
      await Message.increment(
        { likes: 1 },
        { where: { id: req.params.messid,}, }
      );
      await Like.create({
        messid: req.params.messid,
        userid: res.locals.user,
      });
    } else {
      await Message.increment(
        { likes: -1 },
        { where: { id: req.params.messid,}, }
      );
      await Like.destroy({
        where: { messid: req.params.messid, userid: res.locals.user },
      });
    }
    res.status(200).json({
        message: res.locals.user + req.params.messid + userAlreadyLiked,
      });
  } catch {
    res.status(404).json({ error: "not found" });
  }
};

exports.getLikeStatus = async (req, res, next) => {
  try {
    const didTheUserLiked = await Like.findOne({
      where: { messid: req.params.messid, userid: res.locals.user },
    });
    let userAlreadyLiked;
    if (didTheUserLiked) {
      userAlreadyLiked = true;
    } else {
      userAlreadyLiked = false;
    }
    res.status(200).json({ message: userAlreadyLiked });
  } catch {
    res.status(404).json({ error: "not found" });
  }
};
