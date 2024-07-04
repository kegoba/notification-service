var route = require('express').Router()
const {checkAuthentication, checkAuthorization} = require('../middlewares/auth');
const welletController = require('../controllers/walletController')
const Notifications = require("../helpFunction/notificationService")



//automaticBulkDebitUsers


route.get('/balance', checkAuthentication, welletController.getWalletBalance) 
route.post('/credit',checkAuthentication,  welletController.creditWallet)  
route.post('/autodebit', checkAuthentication ,welletController.automaticDebitWallet)  
route.post('/autobulk', welletController.automaticBulkWalletDebit) //







module.exports = route