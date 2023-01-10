const router = require('express').Router();
const user = require('../models/user.model');

const admin = require('../config/firebase.config');


router.get('/signin', async(req, res)=>{
    if(!req.headers.authorization){

    }
    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(404).send({msg: "No user found"});
        }else{
            return res.status(200).send(decodeValue)
        }
    } catch (error) {
        return res.status(500).json({msg: "ERROR"})
    }
})




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