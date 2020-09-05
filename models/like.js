const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
     blackliveid: {
        type: String,
    },
    liked: {
        type: String,
    },
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps:true
})

module.exports = mongoose.model('Like', likeSchema);
