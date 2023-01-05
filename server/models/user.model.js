const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    imageURL: {type: String, required: true},
    userID: {type: String, required: true},
    bio: {type: String},
    participatedHackathon: [{type: Schema.Types.ObjectId, ref: "hackathon"}],
});

module.exports = mongoose.model('user', userSchema);