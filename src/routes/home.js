const express = require('express')
const router = express.Router()

const homeController = require('../app/controllers/HomeController')
const VerifyToken = require('../app/controllers/VerifyToken');
const { verifyToken } = require('../app/controllers/VerifyToken');

router.get('/', homeController.index)
router.get('/delfail', homeController.index)
router.get('/loggedwithgoogle',homeController.index)
router.get('/loggedwithgoogle/delfail',homeController.index)
router.get('/logged/:username', VerifyToken.checkLogin, homeController.index)
router.get('/logged/:username/delfail', homeController.index)
router.get('/logged/:username/delfail1', homeController.index)
router.get("/logged/:username/delfail1/refresh", homeController.requestRefreshToken);
router.delete('/logged/:username/:_id', VerifyToken.verifyTokenAndUserAuthorization, homeController.delete)
// router.get('/sort_by/:slug', homeController.sort)
// router.put('/sort_by/:_id', homeController.cart)

module.exports = router