const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token = req.headers.authorization
  const secret = process.env.JWT_SECRET || 'FireFlight Secret!';

  if (token) {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if(err) {
        //invalid token
        res.status(401).json({ you: 'shall not pass'}) 
      } else {
        //valid token
        
        req.jwt = { username: decoded.username, user_id: decoded.subject }



        next();
      }
    });
  } else {
    res.status(401).json({ you: 'no token provided'}) 
  }
}