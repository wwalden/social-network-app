// A VERIFIER
// A IMPLÉMENTER


module.exports = (req, res, next) => {
  const userInDb = await User.findOne({ where: { id: res.locals.user} })
  const userStatus = userInDb.isAdmin.toString();
  if (!userStatus) {
    return res.status(400).json({ message: "not allowed" })
    }
  next()
};