const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const record= require("./routes/record");
const port = process.env.PORT || 5000;
const menteeroute=require("./routes/mentee");


app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/mentee"))
// get driver connection



// //routes to test1
// app.use('/',testroute);


const dbo = require("./db/connection/connection");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});