const mongoose = require("mongoose");
const Schema = new mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    reting: {
        type: number,
        min: 1,
        max: 5
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Reviews', reviewSchema);