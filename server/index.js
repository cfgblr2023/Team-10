const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const cookie = require('cookie')
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
app.use(cors());
app.use(express.json());
app.use("/mentee", menteeroute)
app.use("/mentor", mentorroute)
app.get("/",(req,res) => {
    res.status(200).json({"Hello":"Alien"})
})
app.post("/login", async (req, res) => {
  try {
    const mentee = await Mentee.findOne({ username: req.body.username });
    if (mentee && req.body.password === mentee.password) {
      const jsonData = { id: mentee._id };
      res.setHeader('Set-Cookie', `jsonData=${encodeURIComponent(JSON.stringify(jsonData))}`);
      const cookieHeader = req.headers.cookie;
      let data = null;

      if (typeof cookieHeader === 'string') {
         const cookies = cookie.parse(cookieHeader);
          data = cookies.jsonData ? JSON.parse(decodeURIComponent(cookies.jsonData)) : null;
      }
      return res.status(200).json({
        message: "Login Successful",
        email: mentee.email,
        role: "Mentee",
        data: data
      });
    }

    const mentor = await Mentor.findOne({ username: req.body.username });
    if (mentor && req.body.password === mentor.password) {
      const jsonData = { id: mentor._id };
      res.setHeader('Set-Cookie', `jsonData=${encodeURIComponent(JSON.stringify(jsonData))}`);
      const cookieHeader = req.headers.cookie;
      const cookies = cookie.parse(cookieHeader);
      const data = cookies.jsonData ? JSON.parse(decodeURIComponent(cookies.jsonData)) : null;
      return res.status(200).json({
        message: "Login Successful",
        email: mentor.email,
        role: "Mentor",
        data: data
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