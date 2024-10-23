const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const mongoose=require("mongoose");
const helmet= require("helmet");
const session = require("express-session");
const axios = require("axios");
const bodyParser = require('body-parser');
const ejs= require("ejs");
const logging=require("./middlewares/logging");
const userRouter=require("./routes/User");
const authRouter=require("./routes/auth");
const adminRouter=require("./routes/admin");

//2) set connection
mongoose.connect("mongodb+srv://rawanshahin95:S4uNtQjouQJAeIPO@cluster0.bu7gwq9.mongodb.net/GoGreen?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to Database...");
})
.catch((err) => {
  console.error("Connection error:", err);
});

//built in midlleware
app.use(
    session({
      secret: "your secret key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using https
    })
  );
app.use(express.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin : '*'}))
app.use("/hello",express.static("public")); //static files (css,html,js,img,..)


//user middleware(APPLICATION-LEVEL MIDDLEWARE)
//LOGIN
app.use(logging);


app.use("/api/",userRouter);
app.use("/api/login",authRouter);
app.use("/api/admin",adminRouter);

const port = process.env.PORT || 3001;


 

app.listen(port,()=>{
    console.log(`listening to ${port}..`)
});
