const router = require("express").Router();
const Mentee = require("../db/models/Mentee")
const CryptoJS = require("crypto-js");
router.post("/register",async (req,res)=>{
    const newUser = new Mentee({
        username: req.body.username,
        email: req.body.email,
        password : req.body.password,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        ageCategory:req.body.ageCategory,
        dateOfBirth:req.body.dateOfBirth,
        languagesSpoken:req.body.languagesSpoken,
        address:req.body.address,
        educationStatus:req.body.educationStatus,
        educationProgram:req.body.educationProgram,
        plansAfter5Years:req.body.plansAfter5Years,
        availableDays:req.body.availableDays,
        availableTimingSlots:req.body.availableTimingSlots,
        otherComments:req.body.otherComments,
    });
    console.log(newUser)
   try{
       const saveuser = await newUser.save();
       console.log(saveuser)
       res.status(201).json(saveuser);

   }catch(err){
      console.log(err)
       res.status(500).json(err);
       console.log(err);
   }  
});

router.post("/login",async(req,res)=>{
    try{
      const lo_user=await Mentee.findOne({email:req.body.email});
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