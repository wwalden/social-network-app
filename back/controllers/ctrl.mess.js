const Message = require("../models/message");
const user = require("../models/user");

exports.createMess = (req, res, next) => {
  const newMess = Message.create({
    userid: user.id,
    content: req.body.content
  })
    .then((newMess) => res.status(201).json({ Message: newMess.id }))
    .catch((error) => res.status(400).json({ error }));
};



