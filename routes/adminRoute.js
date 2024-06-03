
const route = require("express").Router()
const registerAdminController = require("../controllers/adminController")



route.post("/create", registerAdminController.registerAdmin)







module.exports  = route








