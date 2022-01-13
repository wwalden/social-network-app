const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const EMAIL_REGEX     = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


exports.signup = (req, res, next) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  if (!email) {
    return res.status(400).json({ 'error': 'missing email, please fill email' });
  }

  if (!username) {
    return res.status(400).json({ 'error': 'missing username, please fill username' });
  }

  if (!password) {
    return res.status(400).json({ 'error': 'missing password, please fill password' });
  }
  
  if (username.length >= 17 || username.length <= 5) {
    return res.status(400).json({ 'error': 'wrong username (must be length 6 - 16)' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'email is not valid' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'invalid password :  must contain at least 8 chars (uppercase AND lowercase), at least one number, at least one special char)' });
  }
  
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
