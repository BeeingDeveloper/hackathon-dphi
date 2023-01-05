const router = require('express').Router();
const hackathon = require('../models/hackathon.model')



router.post('/create', async(req, res)=>{
    const newHackathon = hackathon({
        name: req.body.name,
        imageURL: req.body.imageURL,
        description: req.body.description,
        hackathonTime: req.body.hackathonTime,
        level: req.body.level,
    });

    try {
        const savedHackthon = await newHackathon.save();
        return res.status(200).send({success: true, data: savedHackthon});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});





router.get('/get', async(req, res)=>{
    try {
        const allHackathon = await hackathon.find().sort({createdAt: 1});
        return res.status(200).send({success: true, data: allHackathon});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});





router.put('/update/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const hackathonID = await hackathon.findByIdAndUpdate(id);
        return res.status(200).send({success: true, data: hackathonID})
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});





router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedItem = await hackathon.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedItem})
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})

module.exports = router;