const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { 
  emailValidation,
  passwordValidation,
  inputValidation,
  phoneValidation,
  validateAmount,
} = require("../helpFunction/validationService")



//register user or add Paitent
const registerUser = async (req, res) => {
  if (!inputValidation(req.body.name) || !emailValidation(req.body.email)  ||
        !phoneValidation(req.body.phone) || !passwordValidation(req.body.password)) {
     
          res.status(400).json({message:"Invalid Input"})
    }
    try {
      const userInfo = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
      });
      
      const data = await userInfo.save();
      res.status(200).json({data : "Registered Succesfully"});
    }
    catch(error){
      res.status(400).json({data : error.message})
    }
 
  }
  
//Login User
const loginUser = async (req, res) => {
  if (!emailValidation(req.body.email) || !passwordValidation(req.body.password)) {

res.status(400).json({message:"Invalid Input"})
}
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    if (userInfo) {
      await bcrypt.compare(req.body.password, userInfo.password, (wrong, correct)=>{
        if (correct){
          // assign Token to user and save
          const token = jwt.sign({ id: userInfo._id, role:userInfo.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
          data = {
            token : token,
            name : userInfo.name,
            email : userInfo.email,
            phone : userInfo.phone,
            id : userInfo._id,
          }
            res.status(200).json({data : data});

        }else {
          res.status(400).json({ data :  'Invalid Password or Email '});
        }
      })
      
    }else{
      res.status(401).json({ data :  'Invalid Password'});
    }

  }catch(error){
    res.status(400).json({ data :  error});

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

    res.status(200).json({data:"all user delted"});

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
