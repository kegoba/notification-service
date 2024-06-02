const User = require("../models/userModel")


const registerAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password, role: 'admin' });
      await user.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error registering admin' });
    }
  };







  module.exports = {
    registerAdmin
  }