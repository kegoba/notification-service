

const route = require('express').Router()

const paymentController = require("../controllers/paymentController")





route.post("/makepayment", paymentController.MakePayment)

route.post("/verify", paymentController.verify)














module.exports = route




