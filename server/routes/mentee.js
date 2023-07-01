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

router.put("/assign-module", async (req, res) => {
    // const cookieHeader = req.headers.cookie;
    // const cookies = cookie.parse(cookieHeader);
    // const data = cookies.jsonData ? JSON.parse(decodeURIComponent(cookies.jsonData)) : null;
    const data = req.body.id
    const filter = { _id: new ObjectID(id) };
    const update = { $set: { areasOfInterest: newAreasOfInterest } };
    const result = await collection.findOneAndUpdate(filter, update, { returnOriginal: false });
    if (result.ok) {
        try {
            const menteeId = data
            const mentee = await Mentee.findOne({ _id: menteeId });
            const menteeLanguages = mentee.languagesSpoken.split(',').map((lang) => lang.trim());
            const menteeQualifications = mentee.qualification.split(',').map((qual) => qual.trim());
            const menteeAvailability = mentee.availableDays.split(',').map((day) => day.trim());

            const mentors = await Mentor.findAll({ mentorAssigned: false });

            mentors.forEach((mentor) => {
                const mentorLanguages = mentor.languagesSpoken.split(',').map((lang) => lang.trim());
                const mentorQualifications = mentor.qualification.split(',').map((qual) => qual.trim());
                const mentorAvailability = mentor.availableDays.split(',').map((day) => day.trim());
                const commonLanguages = mentorLanguages.filter((language) => menteeLanguages.includes(language));
                const commonQualifications = mentorQualifications.filter((qual) => menteeQualifications.includes(qual));
                const commonAvailability = mentorAvailability.filter((day) => menteeAvailability.includes(day));
                if (commonLanguages.length > 0 && commonQualifications.length > 0 && commonAvailability.length > 0) {
                    mentor.menteeIdAssigned = menteeId
                    mentee.mentorIdAssigned = mentor._id
                    mentor.menteeAssigned = true;
                    mentee.mentorAssigned = true;
                    mentor.save();
                    mentee.save();
                    console.log(`Mentor ${mentor.username} matched with Mentee ${mentee.username}`);
                    return res.status(200)                    
                }
            });            
        } catch (error) {
            console.error(error);
        }        
    } else {
        res.status(500)
    }
})

module.exports = router;