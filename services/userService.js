const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Response, Request} = require("express")
const User = require('../models/userModel');

const Wallet = require('../models/walletModel');
const { 
    emailValidation,
    passwordValidation,
    inputValidation,
    phoneValidation,
    validateAmount,
  } = require("../helpFunction/validationService");
const { getSingleUser } = require('../controllers/userController');


const loginService = async (email, password) => {
    if (!emailValidation(email) || !passwordValidation(password)) {
      throw new Error('Invalid Input');
    }
  
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      throw new Error('User Not Found');
    }
  
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid Password or Email');
    }
  
    const token = jwt.sign(
      { id: userInfo._id, role: userInfo.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  
    const data = {
      token: token,
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      id: userInfo._id,
    };
  
    return data;
  };
          




  const registerService = async (data) => {
    // Validate input data
    if (!inputValidation(data.name) || 
        !emailValidation(data.email) || 
        !phoneValidation(data.phone) || 
        !passwordValidation(data.password)) {
      return { success: false, message: "Invalid Input" };
    }
  
    try {
      // Check if user already exists
      const userFound = await User.findOne({ email: data.email });
      if (userFound) {
        return { success: false, message: "Email Exists" };
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);
  
      // Create new user
      const userInfo = new User({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword
      });
  
      // Save the user
      const info = await userInfo.save();
  
      // Create wallet for the new user
      const wallet = new Wallet({
        user: userInfo._id
      });
  
      // Save the wallet
      await wallet.save();
  
      // Return user information
      return { success: true, data: info };
    } catch (error) {
      // Handle any other errors
      return { success: false, message: error.message };
    }
  };
  
  




 const getSingleService = ()=>{

    
}


 const getAllUserService = ()=>{

    
}



module.exports={
    loginService,
    registerService,
    getAllUserService,
    getSingleUser
}


