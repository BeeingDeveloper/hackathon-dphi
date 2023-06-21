const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hackathonModel = Schema({
    name: {type: String, required: true},
    authorID: {type: String, required: true},
    imageURL: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    level: {type: String, required: true},
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model('hackathon', hackathonModel);