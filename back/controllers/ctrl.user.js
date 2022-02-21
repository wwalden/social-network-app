const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const EMAIL_REGEX     = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// regex password: at least 8 chars (uppercase AND lowercase), at least one number, at least one special char
const PASSWORD_REGEX  =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const sessionDuration = 24 * 3600 * 1000;


exports.signup = (req, res, next) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  if (!email) {
    return res.status(401).json({ 'error': 'missing email, please fill email' });
  }
  if (!username) {
    return res.status(401).json({ 'error': 'missing username, please fill username' });
  }
  if (!password) {
    return res.status(401).json({ 'error': 'missing password, please fill password' });
  }
  if (username.length >= 17 || username.length <= 5) {
    return res.status(400).json({ 'error': 'wrong username (must be length 6 - 16)' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(401).json({ 'error': 'email is not valid' });
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(401).json({ 'error': 'invalid password :  must contain at least 8 chars (uppercase AND lowercase), at least one number, at least one special char)' });
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
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};



exports.login = (req, res, next) => {
  let email = req.body.email;
  if (!EMAIL_REGEX.test(email)) {
    return res.status(401).json({ 'error': 'email is not valid' });
  }
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
          req.session.user = user;
          res.cookie('jwt', token, {maxAge: sessionDuration})
          res.status(200).json({
            auth: true,
          });
        })
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};


exports.logout = (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('userID', '', { maxAge: 1 });
    req.session.destroy();
    res.status(200).json({message: "lougout with success"})
  } catch {
    res.status(404).json({
      error: new Error("logout error"),
  })
  }
}

//User Controllers
exports.showUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((message) => {
      if (req.params.id !== res.locals.user) {
        return res.status(400).json({ message: "not allowed" })
      }
      res.status(200).json(message)
    })
    .catch(error => res.status(400).json({ error }));
}


exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id !== res.locals.user) {
      return res.status(401).json({ error: new Error("wrong user: not allowed") })
    }
    const userInDb = await User.findOne({ where: { id: res.locals.user } })
    const userEmail = userInDb.email;
    await User.update(
        {email: "!USER_DELETED_" + userEmail}, {
        where : {
          id: req.params.id
        }
      })
    res.status(200).json({ message: 'User supprimé !' })
  } catch {
    res.status(404).json({ error: new Error("error in deletion process: not allowed")})
  }
}


exports.updateUser = async (req, res, next) => {
  try {
    if (req.params.id !== res.locals.user) {
      return res.status(401).json({ error: new Error("wrong user: not allowed") })
    }
    const userInDb = await User.findOne({ where: { id: res.locals.user } })
    userEmail = req.body.email ? req.body.email : userInDb.email
    userUsername = req.body.username ? req.body.username : userInDb.username
    userPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : userInDb.password
    userBio = req.body.bio ? req.body.bio : userInDb.bio
    await User.update(
        {email: userEmail, username: userUsername, password: userPassword, bio: userBio}, {
        where : {
          id: req.params.id
        }
      })
    res.status(200).json({ message: 'User mis à jour !' })
  } catch {
    res.status(404).json({ error: new Error("error in deletion process: not allowed")})
  }

}
