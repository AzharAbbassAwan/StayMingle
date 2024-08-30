const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogedIn, isOwner} = require("../middleware.js");
const multer = require("multer");
const upload = multer({dest: "uploads/"});

const listingController = require("../controllers/listings.js");


router
    .route("/")
    .get(wrapAsync(listingController.index))
    //.post(isLogedIn, validateListing, wrapAsync(listingController.creat));
    .post(upload.single('listing[image][url]'), (req, res) =>{
        res.send(req.file);
    });

//New Route
router.get("/new", isLogedIn, listingController.new);
    
router
    .route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLogedIn, validateListing, wrapAsync(listingController.update))
    .delete(isLogedIn, wrapAsync(listingController.destroy));


//edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;