const router = require("express").Router();
const Mentee = require("../db/models/Mentee")
const Mentor = require("../db/models/Mentor")
const cookie = require('cookie')

router.post("/register", async (req, res) => {
    const newUser = new Mentee({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        ageCategory: req.body.ageCategory,
        dateOfBirth: req.body.dateOfBirth,
        languagesSpoken: req.body.languagesSpoken,
        address: req.body.address,
        educationStatus: req.body.educationStatus,
        educationProgram: req.body.educationProgram,
        plansAfter5Years: req.body.plansAfter5Years,
        availableDays: req.body.availableDays,
        availableTimingSlots: req.body.availableTimingSlots,
        otherComments: req.body.otherComments,
        areasOfInterest:null
    });
    console.log(newUser)
    try {
        const saveuser = await newUser.save();
        console.log(saveuser)
        res.status(201).json(saveuser);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
        console.log(err);
    }
});

router.get("/dashboard", async(req ,res) => {
    try{
    // const cookieHeader = req.headers.cookie;
    // const cookies = cookie.parse(cookieHeader);
    // const data = cookies.jsonData ? JSON.parse(decodeURIComponent(cookies.jsonData)) : null;
    id=req.body.id
    const details = await Mentee.findOne({_id:id})
    res.status(200).json(details);
    }catch(err){
       res.status(500).json(err);
    }
 });

module.exports = router;