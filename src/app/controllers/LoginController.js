const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config()

class LoginController {
  index(req, res) {
    res.render('login', {});
  }

  login(req, res) {
    const usernameOrEmail = req.body.username;
    const password = req.body.password;
    

    User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
      .then(user => {
        if (password === user.password) {
          const accessToken = jwt.sign(
            {
              id: user.id,
              username: user.username,
              admin: user.isAdmin,
            },
            process.env.SECRET,
            { expiresIn: "30s" }
          );

          let others = {};
          if (user._doc && user._doc.password) {
            const { password, ...rest } = user._doc;
            others = rest;
          }
          // res.render('login', {
          //   token: accessToken,
          //   info: others,
          // });

          const refreshToken = jwt.sign(
            {
              id: user.id,
              username: user.username,
              admin: user.isAdmin,
            },
            process.env.SECRET,
            { expiresIn: '10m' }
          );

          res.cookie('token', accessToken, { maxAge: 6000000, httpOnly: true, sameSite: "strict" });
          res.cookie('refreshToken', refreshToken, { maxAge: 6000000, httpOnly: true, sameSite: "strict" });
          res.cookie('info', others, { maxAge: 6000000, httpOnly: true, sameSite: "strict" });
          return res.redirect('http://localhost:3000/logged/' + user.username)
        } else {
          return res.render('login', {
            importuser: req.body,
            wn: "warning"
          });
        }
      })
      .catch(err => {
        console.log(err + "\nError Login")
        return res.render('login', {
          importuser: req.body,
          wn: "warning"
        });
      });
  }
}

module.exports = new LoginController();