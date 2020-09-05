const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
     blackliveid: {
        type: String,
    },
    commentname: {
        type: String,
    },
     postedby: {
        type: String,
    },
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps:true
})

module.exports = mongoose.model('Comment', commentSchema);
