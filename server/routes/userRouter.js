const router = require('express').Router();
const user = require('../models/user.model');

router.post('/create', async(req, res)=>{
    const newUser = user({
        name: req.body.name
    });

    try {
        const savedUser = await newUser.save();
        return res.status(200).send({success: true, data: savedUser});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }

});



router.get('/get', async(req, res)=>{
    try {
        const allUser = await user.find().populate('hackathon');
        return res.status(200).send({success: true, data: allUser});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})

module.exports = router;