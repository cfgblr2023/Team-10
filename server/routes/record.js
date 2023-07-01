const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require("cors");
const testroute = require("../routes/record")
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const app = express();
const recordRoutes = express.Router();

 
// This will help us connect to the database
const dbo = require("../db/connection/connection")
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 

// This section will help you get a list of all the records.
recordRoutes.route("/").get(function (req, res) {
 let db_connect = dbo.getDb("cfgdb");
 db_connect
   .collection("auth")
   .find({})
   .toArray(function (err, result) {
     if (err) console.log(err);
     res.json(result);
   });
});


// This section will help you create a new record.
recordRoutes.route("/login").post(function (req, res) {
  let db_connect = dbo.getDb("cfgdb");
  db_connect
    .collection("auth")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.json("0"); // Send error response
      } else {
        const foundUser = result.find(
          (ele) =>
            ele.username === req.body.username && ele.password === req.body.password
        );
        if (foundUser) {
          console.log("Successful Login");
          res.json("1"); // Send success response
        } else {
          console.log("Invalid credentials");
          res.json("0"); // Send failure response
        }
      }
    });
});

// recordRoutes.route("/login").post(function (req, response) {
//   // console.log(req,response);
//   let db_connect = dbo.getDb("test1");
//   db_connect
//    .collection("auth")
//    .find({})
//    .toArray(function (err, result) {
//      if (err) console.log(err);
//      const res_array = response.json(result);
//      res_array.map((ele,i)=> {
//         if(req.body.username===ele['username']){
//           if(req.body.password===ele['password']){
//             console.log("Successful Login")
//             res.json("1")
//           }
//         }
//         res.json("0")
//      })
//    });
//   })

 recordRoutes.route("/register").post(function (req, response) {
  // console.log(req,response);
  let db_connect = dbo.getDb("cfgdb");
  let obj = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    number: req.body.number
  };
  db_connect.collection("auth").insertOne(obj, function (err, res) {
    if (err) throw err;
    console.log(res);
    console.log("Successful Register");
    response.json(res);
  });
 }); 

module.exports = recordRoutes;
