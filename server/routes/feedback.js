const router = require("express").Router();
const Feedback=require("../db/models/feedback");

router.post("/feedback",async (req,res)=>{
    const newFeedback = new Feedback({
        mentorID:req.body.mentorID,
        menteeID:req.body.menteeID,
        sessionid:req.body.sessionid,
        sessionduration:req.body.sessionduration,
        rating:req.body.rating,
        comments:req.body.comments,
    });
    console.log(newFeedback)
   try{
       const savefeedback = await newFeedback.save();
       console.log(savefeedback)
       res.status(201).json(savefeedback);

   }catch(err){
      console.log(err)
       res.status(500).json(err);
       console.log(err);
   }  
});

module.exports = router;
