const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const User =  require("../models/user");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  const {email, password, name, phone, gender, heardAboutUs, city, state} = req.body;

  if(!errors.isEmpty()){
    return res.status(422).json({
     error: errors.array()[0].msg,
    })
  }

  User.findOne({email: email}).then((user)=>{
     if(user){
       return res.status(400).json({
           error: "E-mail is already registered"
       })
     }
     const newUser = new User({...req.body, password: bcrypt.hashSync(password, 8)})
     newUser.save()
     .then((user)=> res.status(200).json(user))
     .catch((error)=> res.status(400).json(error));
  })
  .catch((error)=>{
    return res.status(400).json({error: error});
  })
}



exports.signin = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    let user = await User.findOne({ email });
 
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
 
    const payload = {
      user: {
        id: user.id,
      },
    };
 
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          return res.json({
            success: false,
            error: err,
          });
        }
 
        const { name, role, email, _id } = user;
        res.json({
          token: "Bearer " + token,
          name: name,
          role: role,
          email: email,
          _id: _id,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
 };
 

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    status: true,
    message: "User signed-out successfully",
  });
}

exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});