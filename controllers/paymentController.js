const { response } = require("express")
const { acceptPayment , verifyPayment} = require("../services/paymentService")

const User = require("../models/userModel")
const Wallet = require("../models/walletModel")




const MakePayment = async (req, res)=>{
    const {email, amount} = req.body

    await acceptPayment(email, amount)
    .then((response)=>{
        console.log(response)
        res.status(200).json({message : response})
    })
    .catch((error)=>{
        res.status(400).json({message : error})
    })

    
}



const verify = async (req,res)=>{
  const { reference} = req.body;
  const data = await  verifyPayment (reference)
  const amount= data.data.amount
  const email =  data.data.customer.email

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the wallet associated with the user
    let wallet = await Wallet.findOne({ user: user._id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Update the wallet balance
    wallet.balance += amount / 100;
    // Ensure paymentReference is initialized
    if (!Array.isArray(wallet.paymentReference)) {
      wallet.paymentReference = [];
    }
    if (!wallet.paymentReference.includes(reference)) {
        // Push the new reference to the paymentReference array
        wallet.paymentReference.push(reference);
      } else {
        return res.status(301).json({ message: 'Payment reference already verified and save' });
      }
    // Save the updated wallet
    wallet = await wallet.save();

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }

}




module.exports = {
    MakePayment,
    verify
}