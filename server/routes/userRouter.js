const router = require('express').Router();
const user = require('../models/user.model');

const admin = require('../config/firebase.config');

// SIGN IN FUNCTIONALITY-----------------------------------------------------------------------------------------
router.post('/signin', async(req, res)=>{
    if(!req.headers.authorization){
        return res.status(401).send({msg: "FALIURE"});
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);

        if(!decodeValue){
            return res.status(404).json({message: "Un Authorized User"});
        }else{
            const isUserExists = await user.findOne({'user_id': decodeValue.user_id});
            
            if(!isUserExists){
                createNewUser(decodeValue, req, res);
            }else{
                updateUserData(decodeValue, req, res);
            }
        }
    } catch (error) {
        
    }
});
//-----------------------------------------------------------------------------------------------------------





//CRAETE NEW USER FUNCTION-----------------------------------------------------------------------------------
const createNewUser = async(decodeValue, req, res)=>{
    const newUser = user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    });

    try {
        const savedUser = await newUser.save();
        return res.status(200).send({success: true, data: savedUser});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
}
//-----------------------------------------------------------------------------------------------------------




// UPDATE USER FUNCTIONALITY --------------------------------------------------------------------------------
const updateUserData =async(decodeValue, req, res)=>{
    const existUserID = {user_id: decodeValue.user_id};

    const option = {
        upsert: true,
        new: true
    }

    try {
        const updatedUser = await user.findOneAndUpdate(existUserID, {auth_time: decodeValue.auth_time}, option);
        return res.status(200).send({success: true, data: updatedUser, msg:"USER UPDATED"})
    } catch (error) {
        return res.status(404).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }

}




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