const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hackathonModel = Schema({
    name: {type: String, required: true},
    imageURL: {type: String, required: true},
    description: {type: String, required: true},
    hackathonTime: {type: Date, required: true},
    level: {type: String, required: true},  
},
{timestamps: true}
);

module.exports = mongoose.model('hackathon', hackathonModel);