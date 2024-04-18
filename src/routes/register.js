const express = require('express')
const router = express.Router()

const registerController = require('../app/controllers/RegisterController')

router.get('/', registerController.index)
router.post('/', registerController.register)

module.exports = router