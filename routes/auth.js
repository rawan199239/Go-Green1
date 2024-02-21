const express=require("express");
const router = express.Router();
const validator=require("../middlewares/AuthMWValidator");
const config=require ("config");

const {
    User
}=require("../models/UserModel");

const bcrypt=require("bcrypt");
//const jwt=require("jsonwebtoken");



router.post("/", validator, async (req, res) => {
  //check email
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).send("Invalid email or password..");

    //check password
    const validPswrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPswrd) return res.status(400).send("Invalid email or password..");

    if (!config.get("jwtsec")) return res.status(500).send("Request can not be fullfilled.. Token is not defined");
    const token = user.genAuthToken();

    //send res
    res.header("x-auth-token", token);
    res.status(200).send("logged-in successfully");
  } catch (err) {
    for(let e in err.errors){
      console.log(err.errors[e].message);
      res.status(400).send("bad request..")
  }
  }
});



module.exports=router;

/*router.post("/", validator, async (req, res) => {
  //check email
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).send("Invalid email or password..");

    //check password
    const validPswrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPswrd) return res.status(400).send("Invalid email or password..");

    //check if token is already defined
    if (config.get("jwtsec")) {
      const token = user.genAuthToken();
      //send res
      res.header("x-auth-token", token);
      res.status(200).send("logged-in successfully");
    } else {
      res.status(500).send("Request can not be fullfilled.. Token is not defined");
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad request .. ");
    }
  }
});
*/

/*
module.exports=(err,req,nxt)=>{
    for(let e in err.errors){
        console.log(err.errors[e].message);
        res.status(500).send("Internal server error..")
    }
}
*/
/*
module.exports=function asyncFunction(routeHndler){
    return async function(req,res,nxt){
     try{
         //businesslogic
         await routeHndler(req,res);
     }
     catch(err){
         nxt(err);
     }
    }
  
 }*/