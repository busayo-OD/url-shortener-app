const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
  
    if (password.length < 4) {
      return res.status(400).send({ error: "Password must be at least 4 characters long" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 8);
  
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        {
          _id: newUser._id.toString(),
        },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );
  
      res.status(201).send({ token });
    } catch (err) {
      next(err);
    }
  };
  
const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if(user){
            const password_valid = await bcrypt.compare(req.body.password, user.password)
            if(password_valid){
                const token = jwt.sign({
                    _id: user._id.toString()
                },process.env.JWT_KEY, {expiresIn: '1d'})
                
                res.status(200).send({token:token})
            }
            else{
                res.status(400).send({ error: "Incorrect password"})
            }
        }
        else{
            res.status(400).send({ error: "User does not exist"})
        }
    } catch (err) {
        next(err)
    }
    
}

module.exports = {register, login}