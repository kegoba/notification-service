var route = require('express').Router()
const checkUserLogin = require('../middlewares/auth');
const welletController = require('../controllers/walletController')
const Notifications = require("../helpFunction/notificationService")



//automaticBulkDebitUsers

route.post('/create', checkUserLogin,  welletController.createWallet)
route.get('/balance', checkUserLogin, welletController.getWalletBalance) 
route.post('/credit',checkUserLogin,  welletController.creditWallet)  
route.post('/autodebit', welletController.automaticDebitWallet)  
route.post('/autobulk', welletController.automaticBulkWalletDebit) //







module.exports = route