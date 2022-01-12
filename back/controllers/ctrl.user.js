const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Ajouter Regex pour valider email, condition sur la taille du username, etc...
// check si unique, peut se faire via SQL, correct?
// Promises imbriquées à changer: essayer async await

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        bio: req.body.bio,
        isAdmin: 0,
      })
        .then((newUser) => res.status(201).json({ userId: newUser.id }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: `L'utilisateur n'existe pas` });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, `${process.env.TOKEN_KEY}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
