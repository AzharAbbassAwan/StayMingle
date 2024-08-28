const express = require("express");
const router = express.Router({mergeParams: true});
const {reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//custom middleware function for review validation
const valiateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
}

//Posting reviews
router.post("/", isLogedIn, valiateReview, wrapAsync(reviewController.create));

//deleting reviews
router.delete("/:reviewId", 
    isLogedIn,
    isReviewAuthor, 
    wrapAsync(reviewController.destroy));

module.exports = router;