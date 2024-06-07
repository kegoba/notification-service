
const route = require("express").Router()
const {checkAuthentication, checkAuthorization} = require("../middlewares/auth")
const registerAdminController = require("../controllers/adminController")

const UserController = require("../controllers/userController")



route.post("/create", registerAdminController.registerAdmin)



route.get('/getallusers',checkAuthentication ,checkAuthorization, UserController.getAllUser) 

route.get('/getsingleuser', checkAuthentication, checkAuthorization, UserController.getSingleUser)  


route.delete('/deletealluser', checkAuthentication,checkAuthorization, UserController.deleteAllUser)  



module.exports  = route








