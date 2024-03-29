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
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            dateJoined: {type: String}
        }
    ]
},
{timestamps: true}
);

const Hackathon = mongoose.model('Hackathon', hackathonModel);
module.exports = Hackathon;

module.exports = mongoose.model('hackathon', hackathonModel);