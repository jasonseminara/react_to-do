const jwt     = require('jsonwebtoken');

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}


module.exports={

  createToken(req,res,next){
    const {username,user_id}=res.user
    // we should be certain that a user exists by now (res.user)
    const token = jwt.sign({username,user_id}, 'superSecret', {
      expiresIn: 30 // expires in 24 hours
    });

    // return the information including token as JSON
    return res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  },

  validateToken(req,res,next){
    const token = getTokenFromHeader(req)

    // no token, die here
    if (!token){
      res.status(403).end()
      return
    }

    // token
    jwt.verify(token, 'superSecret', (err, decoded) =>{
      // bad token
      if (err) {
        res.status(401).end()
        return
      }

      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
      return;

    })

  console.log("@#$@#$")
  return
  }
}
