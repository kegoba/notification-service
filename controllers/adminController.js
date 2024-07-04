const User = require('../models/userModel');

const registerAdmin = async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      const user = new User({ name, phone, email, password, role: 'admin' });
      await user.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };







  module.exports = {
    registerAdmin
  }