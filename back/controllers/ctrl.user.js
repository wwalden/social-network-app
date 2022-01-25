const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const EMAIL_REGEX     = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const sessionDuration = 24 * 3600 * 1000;

/*

TODO:
1) PASSER LES FONCTIONS EN ASYNC AWAIT
2) PASSER MES VARIABLES EN DESTRUCTURING:
const { email, password } = req.body

3) découper les fonctions? (pour jwt.sign par exemple)

5) Remettre les Regex sur le userUpdate (username taille mini par exemple) + Ajouter la modif du mdp


*/

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

          const token = jwt.sign({ userId: user.id }, `${process.env.TOKEN_KEY}`, {
            expiresIn: sessionDuration,
          })
          res.cookie('jwt', token, {httpOnly: true, maxAge: sessionDuration})
          res.status(200).json({
            userId: user.id,
            
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}





exports.showUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json({ error }));
}



exports.updateUser = async (req, res, next) => {
  try {
    if (req.params.id !== res.locals.user) {
      const userInDb = await User.findOne({ where: { id: res.locals.user } })
      const userStatus = userInDb.isAdmin.toString();
      if (userStatus !== true) {
        return res.status(400).json({ message: "not allowed" })
      }
    }
    await User.update(
        {bio: req.body.bio, username: req.body.username, email: req.body.email}, {
        where : {
          id: req.params.id
        }
      })
    res.status(200).json({ message: 'User mis à jour !' })
  } catch {
    res.status(400).json({ error})
  }

}
