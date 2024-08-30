const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const listingController = require("../controllers/listings.js");
const {storage} = require("../cloudConfig.js");

const upload = multer({dest: storage});



router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogedIn, validateListing,upload.single('listing[image]'), wrapAsync(listingController.creat));
    


router.get("/new", isLogedIn, listingController.new);
    
router
    .route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLogedIn, validateListing, wrapAsync(listingController.update))
    .delete(isLogedIn, wrapAsync(listingController.destroy));


//edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;