const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, required: true},
    imageURL: {type: String, required: true},
    user_id: {type: String, required: true, },
    bio: {type: String},
    participatedHackathon: [{type: Schema.Types.ObjectId, ref: "hackathon"}],
    email_verified: {type: Boolean, required: true},
    role: {type: String, required: true},
    auth_time: {type: String, required: true}
},{timestamps: true});

module.exports = mongoose.model('user', userSchema);