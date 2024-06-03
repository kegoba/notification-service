const route = require('express').Router()
const {checkAuthentication, checkAuthorization} = require('../middlewares/auth');
const UserController = require('../controllers/userController')
const sendMail = require("../helpFunction/notificationService")





route.post('/register',  UserController.registerUser)


route.post('/login', UserController.loginUser) 


route.get('/getallusers',checkAuthentication ,checkAuthorization, UserController.getAllUser) 

route.get('/getsingleuser', checkAuthentication, UserController.getSingleUser)  


route.delete('/deletealluser', checkAuthentication, UserController.deleteAllUser)   
















module.exports = route