const router = require("express").Router();
const Mentee = require("../db/models/Mentee")

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
  
router.post("/login",async (req, res) => {
    await Mentee.findOne({username : req.body.username})
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