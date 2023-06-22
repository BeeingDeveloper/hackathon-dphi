const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},  
    email: {type: String, required: true},  
    imageURL: {type: String, required: true},
    user_id: {type: String, required: true, unique: true},
    email_verified: {type: String, required: true},
    role: {type: String, required: true},
    auth_time: {type: String, required: true},
    introduction: {type: String, length: 240}, 
    educationalQualification: {type: String, length: 60}, 
    location: {type: String, length: 100}, 
    resume: {type: String}, 
    gitbub: {type: String}, 
    twitter: {type: String}, 
    linkedIn: {type: String}, 
    joinedContest : [
        {
            contest: {
                type: Schema.Types.ObjectId,
                ref: 'Hackathon'
            },
            dateJoined: {type: String}
        }
    ]   
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('user', userSchema);


module.exports = User;