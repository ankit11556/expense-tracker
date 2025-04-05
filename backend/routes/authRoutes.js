const express = require('express')
const authRouter = express.Router();

const authController = require('../controllers/authController')

authRouter.post('/register',authController.registerUser)


module.exports = authRouter