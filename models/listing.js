const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
title:{
    type: String,
    required: true,
},
description:{
    type: String,
},
image:{
    type: Object,
    default: "https://media.istockphoto.com/id/1162069138/photo/green-waterfall.jpg?s=1024x1024&w=is&k=20&c=hDH3gltdRzPO7Y5SpFusws_bKzegETn2wc_A4UYwn8s=",
    set:(v) =>
         v === "" 
            ? "https://media.istockphoto.com/id/1162069138/photo/green-waterfall.jpg?s=1024x1024&w=is&k=20&c=hDH3gltdRzPO7Y5SpFusws_bKzegETn2wc_A4UYwn8s="
             : v,
},
price: Number,
location: String,
country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;