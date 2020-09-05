const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blackliveSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    occupation: {
        type: String
    },
    msg: {
        type: String
    },
    image: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

module.exports = mongoose.model('Blacklive', blackliveSchema);
