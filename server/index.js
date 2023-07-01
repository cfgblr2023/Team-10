const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: "./config.env" });
// const record= require("./routes/record");
const menteeroute = require("./routes/mentee");
const mentorroute = require("./routes/mentor");

const port = process.env.PORT || 5000;
const url = process.env.ATLAS_URI;
const Mentee = require("./db/models/Mentee")
const Mentor = require("./db/models/Mentor")

mongoose.connect(url, (err) => {
  if (err) throw err;
  console.log("Database created!");
});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/mentee", menteeroute)
app.use("/mentor", mentorroute)
app.get("/",(req,res) => {
    let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    console.log(decodedtoken)
    res.status(200).json({"Hello":"Alien"})
})
app.post("/login", async (req, res) => {
  try {
    const mentee = await Mentee.findOne({ username: req.body.username });
    if (mentee && req.body.password === mentee.password) {
      const payload = { id: mentee._id }; // Example payload
      const options = { expiresIn: '1h' }; // Example options
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        maxAge: 3600000 
      });
      // console.log(data)
      // console.log(req.cookies)
      // let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
      return res.status(200).json({
        message: "Login Successful",
        email: mentee.email,
        role: "Mentee",
        // data: decodedtoken
      });
    }

    const mentor = await Mentor.findOne({ username: req.body.username });
    if (mentor && req.body.password === mentor.password) {
      const payload = { id: mentor._id }; // Example payload
      const options = { expiresIn: '1h' }; // Example options
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        maxAge: 3600000 
      });
      return res.status(200).json({
        message: "Login Successful",
        email: mentor.email,
        role: "Mentor",
      });
    }

    return res.status(400).json({
      message: "Invalid username or password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
});




// //routes to test1
// app.use('/',testroute);


// const dbo = require("./db/connection/connection");

app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);

  // });
  console.log(`Server is running on port: ${port}`);
});