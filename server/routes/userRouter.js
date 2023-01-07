const router = require('express').Router();
const user = require('../models/user.model');

router.post('/create', async(req, res)=>{
    const newUser = user({
        name: req.body.name,
        email: req.body.email,
        imageURL: req.body.imageURL,
        userID: req.body.userID,
        // bio: req.body.bio,
        // participatedHackathon: req.body.participatedHackathon,
    });

    // const email = req.body.email;

    try {
        const foundID = await user.find({email: req.body.email});

        if(foundID){
            return res.status(200).send({success: true, data: "foundID[0]"});
        }else{
            const savedUser = await newUser.save();
            return res.status(200).send({success: true, data: savedUser});
        }

    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }

});



router.get('/get/:emailid', async(req, res)=>{

    const userEmail =  req.params.emailid

    try {
        const getUser = await user.findOne({email: userEmail});
        return res.status(200).send({success: true, data: getUser});
    } catch (error) {
        return res.status(400).send({success: false, msg: 'INTERNAL SERVER ERROR'});
    }
})




router.get('/get', async(req, res)=>{
    try {
        const allUser = await user.find().populate('hackathon');
        return res.status(200).send({success: true, data: allUser});
    } catch (error) {
        return res.status(401).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})

module.exports = router;