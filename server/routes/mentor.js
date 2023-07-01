const router = require("express").Router();
const Mentor = require("../db/models/Mentor")
const CryptoJS = require("crypto-js");


router.post("/register",async (req,res)=>{
    const newUser = new Mentor({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password , process.env.Pass_Sec).toString(),
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        qualification:req.body.qualification,
        languagesSpoken:req.body.languagesSpoken,
        availableDays:req.body.availableDays,
        availableTimingSlots:req.body.availableTimingSlots,
        menteeAssigned:req.body.menteeAssigned,
        module:req.body.module
    });
   try{
       const saveuser = await newUser.save();
       res.status(201).json(saveuser);
   }catch(err){
       res.status(500).json(err);
   }  
});

module.exports = router;