const User = require('../models/User')
const jwt = require('jsonwebtoken');
// const Buy = require('../models/Buy')
const cookieParser = require('cookie-parser');
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class HomeController {

    index(req, res) {
        Promise.all([User.find({}).lean()])
            .then(([users]) => {
                if (req.url.indexOf('logged') === -1) {
                    res.clearCookie('info');
                    res.clearCookie('token');
                    res.clearCookie('refreshToken');
                } else {
                    var loguser = req.cookies.info.username;
                }
                if (req.url.indexOf('delfail') !== -1)
                    if (req.url.indexOf('delfail1') !== -1)
                        var warning = "flex"
                    else var warning = "Bạn không được ủy quyền để làm việc này!!!"
                //if(req.cookies.info !== undefined)
                const uData = users;

                delete uData.isAdmin;
                delete uData.password;
                return res.render('home', {
                    user: uData,
                    loguser: loguser,
                    warning: warning
                })
            })
            .catch(err => console.log(err + "\nError Logged!!!"))
    }

    requestRefreshToken(req, res) {
        res.cookie('token', req.cookies.refreshToken, { maxAge: 6000000, httpOnly: true, sameSite: "strict" });
        res.cookie('info', req.cookies.info, { maxAge: 6000000, httpOnly: true, sameSite: "strict" });
        res.clearCookie('refreshToken');
        return res.redirect('http://localhost:3000/logged/' + req.cookies.info.username);
    }

    delete(req, res) {
        User.deleteOne({ _id: req.params._id })
            .then(() => {
                if (!req.cookies.info.isAdmin || req.cookies.info._id === req.params._id) res.clearCookie('info');
                return res.redirect('/logged/' + req.params.username)
            })
            .catch(err => console.log(err + "\nError deleting!!!"))
    }

}

module.exports = new HomeController;
