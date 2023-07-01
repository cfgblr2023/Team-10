const router = require("express").Router();
const Mentor = require("../db/models/Mentor")
const CryptoJS = require("crypto-js");


router.post("/register",async (req,res)=>{
    const newUser = new Mentor({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        qualification:req.body.qualification,
        languagesSpoken:req.body.languagesSpoken,
        availableDays:req.body.availableDays,
        availableTimingSlots:req.body.availableTimingSlots,
        areasOfInterest:req.body.areasOfInterest,
    });
   try{
       const saveuser = await newUser.save();
       res.status(201).json(saveuser);
   }catch(err){
       res.status(500).json(err);
   }  
});

  
router.post("/login",async (req, res) => {
    await Mentor.findOne({username : req.body.username})
      .then((user) => {
 
        if(req.body.password===user.password)
        {
          res.status(200).send({
                    message: "Login Successful",
                    email: user.email,
                  });
        }
        else
        {
          res.status(400).send({
                    message: "Passwords does not match",
                    error,
                  }); 
        }
      })
      // catch error if email does not exis
      .catch((error) => {
       res.status(400).send({
         message: "User doesnot exist",
         error,
       });
     });
  });

module.exports = router;