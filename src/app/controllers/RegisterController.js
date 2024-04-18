const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

let refreshTokens = [];

class RegisterController{

    index(req, res){
        res.render('register', {})
    }

    register(req, res){
        const user = new User(req.body);
        user.save()
        .then(() => res.render('completeReg'))
        .catch(err => { 
            console.log(err)
            if(err.keyValue.hasOwnProperty('username')){
                res.render('register', {
                    importuser : req.body,
                    wnu : "exist"
                })
            }else if(err.keyValue.hasOwnProperty('email')){
                res.render('register', {
                    importuser : req.body,
                    wne : "exist"
                })
            }
        })
    }
}

module.exports = new RegisterController;
