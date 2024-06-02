const route = require('express').Router()
const checkUserLogin = require('../middlewares/auth');
const UserController = require('../controllers/userController')






route.post('/register',  UserController.registerUser)
route.post('/login', UserController.loginUser) 
route.get('/getallusers',checkUserLogin, UserController.getAllUser) 
route.get('/getsingleuser', checkUserLogin, UserController.getSingleUser)  
route.delete('/deletealluser', checkUserLogin, UserController.deleteAllUser)   












module.exports = route