const Message = require("../models/message");
const Comment = require("../models/comment");

exports.createMess = (req, res, next) => {
  const newMess = Message.create({
    userid: req.body.userid,
    content: req.body.content
  })
    .then((newMess) => res.status(201).json({ Message: newMess.id }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMess = (req, res, next) => {
  Message.destroy({
    where : {
      id: req.body.id
    }
  })
    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateMess = (req, res, next) => {
  Message.update(
    {content: req.body.content}, {
    where : {
      id: req.body.id
    }
  })
    .then(() => res.status(200).json({ message: 'Message mis à jour !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.showAllMess = (req, res, next) => {
  Message.findAll()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

