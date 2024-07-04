const mongoose = require('mongoose');
const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const {handleNotification} = require("../helpFunction/notificationService")



// Create a wallet for a user
const createWallet = async (req, res) => {
  const { userId } = req.body;
  try {
    const userInfo = await User.findById({_id : userId});
    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wallet = new Wallet({ user : userId });
    await wallet.save();

    res.status(201).json(wallet);
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get wallet balance
const getWalletBalance = async (req, res) => {
  const { userId } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: userId });
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
  const { userId , amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: userId });
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
    const { userId , amount } = req.body;
    try {
      const wallet = await Wallet.findOne({ user: userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      if(wallet.balance>=amount){
        wallet.balance -= amount;
        await wallet.save();
    
        res.status(200).json({data: wallet, message : "Debited Successfully"});
        
        
      }
      const user = await User.findById(userId)
      //console.log(user.email)
        await handleNotification(user.email);
        res.status(301).json({data : "Debit Failed", wallet})
  

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
    createWallet,
    getWalletBalance,
    creditWallet,
    automaticBulkWalletDebit,
    automaticDebitWallet
}