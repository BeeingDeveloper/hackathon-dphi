const router = require('express').Router();
const hackathon = require('../models/hackathon.model')


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
        return res.status(200).send({success: true, data: savedHackthon});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
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

module.exports = router;