const jwt = require("jsonwebtoken");


// pourquoi celle-ci fonctionne sans asyn await??
module.exports = (req, res, next) => {
  try {
    // OLD: const token = req.headers.authorization.split(" ")[1];
    const token = req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId.toString();
    res.locals.user = userId;
    next();
  } catch {
    res.status(401).json({
      error: new Error("not authenticated: not allowed"),
    });
  }
};




/*
// OLD VERSION //

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId.toString();

    // ne sert à pas grand chose. Seul mon userID fait foi
    if (req.body.userid && req.body.userid !== userId || !req.body.userid) {
      throw "Utilisateur non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête non authentifiée"),
    });
  }
};
*/
