const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const Wallet = require('../models/walletModel');


const { 
  emailValidation,
  passwordValidation,
  inputValidation,
  phoneValidation,
  validateAmount,
} = require("../helpFunction/validationService")



const {
  loginService,
  registerService,
  getAllUserService,
  getSingleService
}=require( "../services/userService")



const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const response = await registerService(data); 

    if (response.success) {
      res.status(200).json({ msg: "registration Succussful" });
    } else {
      res.status(400).json({ msg: response.message });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

  
//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await loginService(email, password);
    return res.json({ response });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  
};


//get Single user
const getSingleUser = async (req, res) => {
  try{
    const user = await User.findOne({email:req.body.email})

    res.status(200).json({data : user});

  } catch(error){
    res.status(400).json({message: error.errors})
  }
  
};

//get all user
const getAllUser = async (req, res) => {

    console.log(req.user.role)
  try{
    const userInfo = await User.find()

    res.status(200).json({data:userInfo});

  } catch(error){
    res.status(401).json({message: error.errors})
  }
  
};


const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  
  try {
    // Find the user by email
    const userInfo = await User.findOne({ email });
    
    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password is correct
    const passwordCheck = await bcrypt.compare(oldPassword, userInfo.password);
    
    if (!passwordCheck) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password and save the document
    userInfo.password = hashedPassword;
    await userInfo.save();
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





const deleteAllUser = async (req, res) => {
  try{
       await User.deleteMany({})

    res.status(200).json({data:"all user deleted"});

  } catch(error){
    res.status(401).json({message: error.errors})
  }
  
};

module.exports = {
    registerUser,
    loginUser,
    getSingleUser,
    getAllUser,
    deleteAllUser,
  
};
