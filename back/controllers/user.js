const models = require("../models");

exports.signup = (req, res, next) => {
  const newUser = models.User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: 0,
  })
    .then((newUser) => res.status(201).json({ userId: newUser.id }))
    .catch((error) => res.status(400).json({ error }));
};
