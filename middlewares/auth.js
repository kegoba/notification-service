const jwt = require('jsonwebtoken');
const { Message } = require('node-mailjet');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const checkAuthentication = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
    return res.status(401).send('Access denied. Invalid token format.');
  }
   
  try {
    const decoded = jwt.verify(token, JWT_SECRET);//JWT_SECRET  
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).send('Invalid token.');
  }
};



const checkAuthorization = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({Message: 'Unauthorize Acessess, Admin route Only.'});
  }

  next();
};




module.exports = { checkAuthentication, checkAuthorization };


