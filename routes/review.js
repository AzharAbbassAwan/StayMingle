const express = require("express");
const router = express.Router({mergeParams: true});
const {reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isReviewAuthor, valiateReview} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Posting reviews
router.post("/", isLogedIn, valiateReview, wrapAsync(reviewController.create));


router.delete("/:reviewId", 
    isLogedIn,
    isReviewAuthor, 
    wrapAsync(reviewController.destroy));

module.exports = router;