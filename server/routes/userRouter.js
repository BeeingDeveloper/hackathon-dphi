const router = require('express').Router();
const user = require('../models/user.model');
const admin = require('../config/firebase.config');



router.get('/signin', async(req, res)=>{

    if(!req.headers.authorization){
        return res.status(404).send({msg: "INVALID USER CREDENTIALS"});
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        
        if(!decodedValue){
            return res.status(400).send({msg: "UN AUTHORIZED USER"});
        }else{
            const isUserExist = await user.findOne({"user_id": decodedValue.user_id});
            if(!isUserExist){   // IF THERE IS NO USER IN MONGODB DATABASE
                return createNewUser(decodedValue, req, res);
            }else{
                return updateExistingUser(decodedValue, req, res);
            }
        }
    } catch (error) {
        return res.status(505).json({msg: "INTERNAL SERVER ERROR"});
    }
});








//  CREATE NEW USER-----------------------------------------------------
const createNewUser = async(decodedValue, req, res)=>{
    const newUser = new user({
        name: decodedValue.name,  
        email: decodedValue.email,  
        imageURL: decodedValue.picture,
        user_id: decodedValue.user_id,
        email_verified: decodedValue.email_verified,
        role: "member",
        auth_time: decodedValue.auth_time,  
    });
            
    try {
        const savedUser = await newUser.save();
        return res.status(200).send({success: true, data: savedUser});
    } catch (error) {
       
    }
}
//---------------------------------------------------------------------







// UPDATE NEW USER-----------------------------------------------------
const updateExistingUser = async(decodedValue, req, res)=>{
    const userID = {user_id: decodedValue.user_id};
    const options = {
        upsert: true,
        new: true,
    }

    try {
        const existingUser = await user.findOneAndUpdate(userID, {auth_time: decodedValue.auth_time});
        res.status(200).send(existingUser);
    } catch (error) {
        res.status(400).send({success: false, msg: "THERE IS AN ERROR TO CREATE NEW USER"});
    }
}
//---------------------------------------------------------------------







// FETCH ALL USERS ----------------------------------------------------
router.get('/all-users', async(req, res)=>{

    try {
        const users = await user.find();
        return res.status(200).send({success: true, data: users})
    } catch (error) {
        return res.status(400).send({success: false, msg: "THERE IS AN ERROR AT FETCHING ALLUSERS"});
    }
});

module.exports = router;