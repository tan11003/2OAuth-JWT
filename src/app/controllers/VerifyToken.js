const jwt = require('jsonwebtoken');
const HomeController = require('./HomeController');
require('dotenv').config()

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.cookies.token;
  const info = req.cookies.info;
  
  
  if (token) {
    jwt.verify(token,process.env.SECRET , (err) => {
      if (err) {
        return res.redirect('http://localhost:3000/logged/' + info.username + "/delfail1")
      }
      next();
    });
  } else {
    return res.redirect('http://localhost:3000/logged/' + info.username + "/delfail")
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const info = req.cookies.info;
    if (info._id === req.params._id || info.isAdmin) {
      next();
    } else {
      return res.redirect('http://localhost:3000/logged/' + info.username + "/delfail")
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const checkLogin = (req, res, next) => {
  const info = req.cookies.info;
  if(info === undefined)
    res.redirect('http://localhost:3000')
  else next();
}

module.exports = {
  checkLogin,
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};