  const jwt = require('jsonwebtoken');
const User = require('../model/user.model')
require("dotenv").config()

const verifyToken = async (req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: decoded._id})

  if(!user){
    return res.status(404).send({ error: 'User not found' });
  } 
  req.token = token
  req.user = user
  next()
} catch(e){
    console.error(e)
    res.status(401).send({ error: 'Please authenticate'})
}
}
module.exports = verifyToken;