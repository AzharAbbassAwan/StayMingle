const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.create = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await listing.save();
    await newReview.save();
    req.flash("success", "New reveiw added!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroy = async (req, res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Reveiw deleted!");
    res.redirect(`/listings/${id}`);
}