const mongoose = require('mongoose');
const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const {handleNotification} = require("../helpFunction/notificationService")
const {validateAmount} = require("../helpFunction/validationService")



// Get wallet balance
const getWalletBalance = async (req, res) => {
  const { id } = req.user;
  if(!id){
    return  res.status(401).json({message : "Unauthorized access"})
  }
  try {
    const wallet = await Wallet.findOne({ user: id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update wallet balance
const creditWallet = async (req, res) => {
 
  const { amount } = req.body;
  if (!validateAmount(amount)) {

    return res.status(400).json({message:"Invalid amount"})
    }
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  //Endpoint to trigger the automated bulk debits. Eg, debiting only one user wallet for a specific amount

const automaticDebitWallet = async (req, res) => {
    const { amount } = req.body;
   
    if(!validateAmount(amount)) {

      return res.status(400).json({message:"Invalid amount"})
      }
    try {
      const wallet = await Wallet.findOne({ user:req.user.id });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      if(wallet.balance < amount){
        
        const user = await User.findById(req.user.id)
        await handleNotification(user.email);
        
        return res.status(301).json({data : "Debit Failed Due to Low Balance"})
      }
     
      wallet.balance -= amount;
      await wallet.save();
      return res.status(400).json({data: wallet, message : "Debited Successfully"});

      
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  //Endpoint to trigger the automated bulk debits. Eg, debiting all the user wallet for a specific amount
const  automaticBulkWalletDebit = async (req, res)=> {
  const {amount} = req.body
  const successfulDebits = [];
  const failedDebits = [];

    // Fetch all users
 
        const users = await User.find();

    for (const user of users) {
      const wallet = await Wallet.findOne({ user: user._id });

      if (wallet) {
        if (wallet.balance >= amount) {
          // Debit the amount from the user's wallet
          wallet.balance -= amount;
          await wallet.save();
          successfulDebits.push({ user, wallet });
        } else {
            failedDebits.push({ user, wallet });
        }
      } else {
        failedDebits.push({ user, wallet: null });
      }
    }

    if (failedDebits.length > 0) {
      const emails = failedDebits.map((data) => data.user.email);

      // Notify users of their failed transactions
      const notificationPromises = emails.map((email) => handleNotification(email, amount));
      
      await Promise.all(notificationPromises);
      }

  res.status(200).json({
    message: 'Bulk debit process completed',
     successfulDebits, 
     failedDebits
    })
}

    
    


module.exports = {
    getWalletBalance,
    creditWallet,
    automaticBulkWalletDebit,
    automaticDebitWallet
}