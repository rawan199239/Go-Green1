const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose=require("mongoose");
const helmet= require("helmet");

/*process.on("uncaughtException",(exception)=>
{   
    console.log("uncaught Exception");
    process.exit(1);
});
process.on("unhandledRejection",(exception)=>{
    console.log("promise rejected");
    process.exit(1);
});*/

const ejs= require("ejs");
const logging=require("./middlewares/logging");
//const errorMW=require("./middlewares/errorMW");
const studentsRouter=require("./routes/Students");
const userRouter=require("./routes/User");
const authRouter=require("./routes/auth");
const adminRouter=require("./routes/admin");




//2) set connection
mongoose.connect("mongodb://localhost:27017/iti",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>{
    console.log("connected to Database...")
})
.catch((err)=>{
    console.log(err)
});

//built in midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use("/hello",express.static("public")); //static files (css,html,js,img,..)

//throw Error("unhandled exception");

/*let p = Promise.reject(new Error("Somthing went wrong"));

p.then(()=>{console.log("success")})
*/
//user middleware(APPLICATION-LEVEL MIDDLEWARE)
//LOGIN
app.use(logging);

app.use("/api/Students",studentsRouter);
app.use("/api/Users",userRouter);
app.use("/api/login",authRouter);
app.use("/api/admin",adminRouter);

//app.use(errorMW);

const port = process.env.PORT || 3001;

    app.get("*",(req,res,nxt)=>{
        console.log("get request recieved");
        nxt();
    })

//ROUTE HANDLER MIDDLEWARE
app.get("/",(req,res,next)=>{
    next();
},(req,res,next)=>{
    //
    //
    console.log("stage #1")
    next();

}, (req, res) => {
    console.log("request recieved...");
    res.sendFile(path.join(__dirname, "/main.html"));
});

app.get("/welcome.html", (req, res) => {
    console.log(req.query);
    console.log(req.query.fnm);
    console.log(req.query.lnm);

    res.sendFile(path.join(__dirname, "/welcome.html"));
});

//app settings
app.set("template engine","ejs");

app.post("/welcome.html", (req, res) => {
    console.log(req.body);
    res.cookie("usernm",Buffer.from(req.body.fnm).toString('base64'));
    res.cookie("userage",25,{httpOnly:true});
    res.send(`thanks ${req.body.fnm} ${req.body.lnm} for sending required data:`);

});
app.get("/abc",(req,res)=>{
    console.log(Buffer.from(req.cookies.usernm,'base64').toString());
    console.log(req.cookies.userage)
    res.sendStatus(200);

})






app.listen(port,()=>{
    console.log(`listening to ${port}..`)
});