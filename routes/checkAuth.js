let jwt = require('jsonwebtoken');

let express = require('express');
let router = express.Router();

const validateToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401)
  }
  let tokenString = authHeader.split(" ");
  if (tokenString[0] !== "Bearer"){
    return res.sendStatus(401)
  }

  let token = tokenString[1];
  jwt.verify(token, 'MY_SECRET', function(err, decoded) {
    if (err){
      return res.sendStatus(401)
    }
    res.locals.username = decoded.username;
    next()
  });
};

router.post('/', validateToken, function(req, res, next) {
  res.status(200).json({
    username: res.locals.username
  })
});

module.exports = {router, validateToken};
