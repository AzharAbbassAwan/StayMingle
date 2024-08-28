const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isOwner} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

//custom middleware function form error handling
const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
}

router.get("/", wrapAsync(listingController.index));

router.get("/new", isLogedIn, listingController.new);

//show route
router.get("/:id", wrapAsync(listingController.show));

//edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.edit));

//update route
router.put("/:id", isLogedIn, validateListing, wrapAsync(listingController.update));

//Create route
router.post("/", isLogedIn, validateListing, wrapAsync(listingController.creat));

//delete route
router.delete("/:id", isLogedIn, wrapAsync(listingController.destroy));


module.exports = router;