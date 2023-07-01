const router = require("express").Router();
const Mentee = require("../db/models/Mentee")
const Mentor=require("../db/models/Mentor")
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

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { sessionDuration } = req.body;
  
    try {
      const mentee = await Mentee.findById(id);
      if (!mentee) {
        return res.status(404).json({ message: "Mentee not found" });
      }
  
      mentee.sessionDuration = sessionDuration;
      const updatedMentee = await mentee.save();
      res.json(updatedMentee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update Mentee" });
    }
  });
  



  module.exports = router;