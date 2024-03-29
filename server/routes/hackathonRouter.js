const router = require('express').Router();
const hackathon = require('../models/hackathon.model')
const User = require('../models/user.model');

// MANAGE NEW USER ================================================================================
router.post('/create', async(req, res)=>{
    const newHackathon = hackathon({
        name: req.body.name,
        authorID: req.body.authorID,
        imageURL: req.body.imageURL,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        level: req.body.level,
    });

    try {
        const savedHackthon = await newHackathon.save();
        return res.status(200).send({success: true, data: savedHackthon, msg: "Contest created successfully"});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR", msg: "Fill all the fields"});
    }
});
// ===============================================================================================







// FETCH ALL HACKATHONS ==========================================================================
router.get('/get-hackathons', async(req, res)=>{
    const allHackathons = await hackathon.find();

    try {
        return res.status(200).send({success: true, data: allHackathons});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})
// ===============================================================================================








// FETCH SINGLE HACKATHONS ==========================================================================
router.get('/get-hackathon/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const hackthonItem = await hackathon.findById(id);
        return res.status(200).send({success: true, data: hackthonItem})
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})
// ===============================================================================================










// FETCH HACKATHONS BY ID ========================================================================
router.put('/update/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const hackathonID = await hackathon.findByIdAndUpdate(id);
        return res.status(200).send({success: true, data: hackathonID})
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
// ===============================================================================================






// DELETE HACKATHONS BY ID ========================================================================
router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedItem = await hackathon.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedItem})
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
// ===============================================================================================









// ADD USER TO THE PARICIPANTS LIST================================================================
router.post('/get-contest/:contest_id/:user_id', async(req, res)=>{
    const { contest_id, user_id } = req.params;

    try {
      const contest = await hackathon.findById(contest_id);
      const user = await User.findById(user_id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const isUserExist = contest.participants.some(elm => elm.user.equals(user._id))
      if (isUserExist) {
        return res.status(200).send({ success: false, msg: 'User already joined the contest' });
    }

      contest.participants.push({user: user, dateJoined: new Date()});
  
      // Save the updated contest
      const savedContest = await contest.save();
      await savedContest.populate('participants.user');
      return res.status(200).json({ success: true, data: savedContest, msg: "Contest joined successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'INTERNAL SERVER ERROR' });
    }
})
// ===============================================================================================








// FETCH PARTICIPANTS LIST=======================================================================
router.get('/fetch-participants/:contestID', async(req, res)=>{
    const contestID = req.params.contestID;
    try {
        const participantsList = await hackathon.findById(contestID).populate('participants.user');
        return res.status(200).send(participantsList)
    } catch (error) {
        return res.status(400).send(error)
    }
})












// ==================================== FITLERING HACKATHONS =====================================
        // --------------- BY PASSED CONTEST
        router.get('/filter/passed', async(req, res)=>{
            const nowDate = new Date();
        
            try {
                const passedHackathons = await hackathon.find({ endDate: { $lt: nowDate } });
                return res.status(201).send({success: true, data: passedHackathons});
            } catch (error) {
                return res.status(401).send({success: false, msg: "FAILED TO FILTER ITEMS"});
            }
        });





        // --------------- BY UPCOMING CONTEST
        router.get('/filter/upcoming', async(req, res)=>{
            const nowDate = new Date();
        
            try {
                const upcomingHackathons = await hackathon.find({ startDate: { $gt: nowDate } });
                return res.status(201).send({success: true, data: upcomingHackathons});
            } catch (error) {
                return res.status(401).send({success: false, msg: "FAILED TO FILTER ITEMS"});
            }
        });





        // --------------- BY ACTIVE CONTEST
        router.get('/filter/active', async(req, res)=>{
            const currentDate = new Date();
            const activeHackathons = await hackathon.find({$and: [{ startDate: { $lt: currentDate } },{ endDate: { $gt: currentDate } }]});

            try {
                return res.status(200).send({success: true, data: activeHackathons});
            } catch (error) {
                return res.status(400).send({success: false, msg: "FAILED TO FITLER ITEMS"});
            }
        })





        // --------------- BY EASY CONTEST
        router.get('/filter/level/:lev', async(req, res)=>{
            const level = req.params.lev;
            try {
                const hackathonItems = await hackathon.find({level: level});
                return res.status(200).send({success: true, data: hackathonItems});
            } catch (error) {
                return res.status(400).send({success: false, msg: "FAILED TO FETCH BY LEVEL"});
            }
        })




module.exports = router;