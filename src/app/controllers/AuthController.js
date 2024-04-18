const passport = require('passport');
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

const authController = {
    callback(req, res) {
        res.cookie('info', {
            username: req.user.given_name + ' ' + req.user.family_name,
        }, { maxAge: 3000000, httpOnly: true });
        return res.render('completeGoogle')
    },
};

module.exports = authController;