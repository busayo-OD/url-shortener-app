const authRouter = require('express').Router();
const authController = require('../controller/auth.controller');
const auth = require('../middleware/auth')

//REGISTER
authRouter.post('/register', authController.register);

//LOGIN
authRouter.post('/login', authController.login);



module.exports = authRouter;