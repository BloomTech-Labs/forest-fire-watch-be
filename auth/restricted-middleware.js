const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "FireFlight Secret!";

  if (token) {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) {
        //invalid token
        res.status(401).json({ message: "You shall not pass" });
      } else {
        //valid token
        req.jwt = { email: decoded.email, user_id: decoded.subject };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please provide a token" });
  }
};
