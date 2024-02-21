const express=require("express");
const router=express.Router();
const validator=require("../middlewares/UserMWValidator");
const bcrypt=require("bcrypt");
//const jwt=require("jsonwebtoken");
const config=require("config");

const {
     User 
    } = require("../models/UserModel");

//Registration 
router.post("/", validator, async (req, res) => {
    try {
      //check already exists
      let user = await User.findOne({
        email: req.body.email
      }).exec();
      if (user)
        return res.status(400).send("User already Registered!!");
  
      //create new user to be add to DB
      let salt = await bcrypt.genSalt(10);
      let hashedPswd = await bcrypt.hash(req.body.password, salt);
      user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPswd
      });
      await user.save();

      if (!config.get("jwtsec")) return res.status(500).send("Request can not be fullfilled.. Token is not defined");

      const token = user.genAuthToken();
      /* jwt.sign({
        usrid: user._id
      }, config.get("jwtsec"));*/
  
      //send res
      res.header("x-auth-token", token);
      res.status(200).send("ok");
    } catch (err) {
      for(let e in err.errors){
        console.log(err.errors[e].message);
        res.status(400).send("bad request..")
    }
    }
  });
  
  
  



module.exports=router;

/*

*/