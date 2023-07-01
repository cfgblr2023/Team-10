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
    });
   try{
       const saveuser = await newUser.save();
       res.status(201).json(saveuser);
   }catch(err){
       res.status(500).json(err);
   }  
});

router.post("/login",async(req,res)=>{
    try{
      const lo_user=await Mentor.findOne({email:req.body.email});
      console.log(req.body.email);
      if(lo_user){
      const validate=await bcrypt.compare(req.body.password,lo_user.password);
      !validate && res.status(400).json("Wrong credentials");
      console.log(req.body.password);
      res.send(lo_user);
      console.log("loged in");
      }
    }
    catch(err){
      console.log(err);
    } 
  });

module.exports = router;