const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLogedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const listingController = require("../controllers/listings.js");


const {storage} = require("../cloudConfig.js");

const upload = multer({storage});


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.creat));
    


router.get("/new", isLogedIn, listingController.new);

//search route
router.post("/search", wrapAsync(listingController.search));

    
router
    .route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLogedIn,upload.single("listing[image]"), validateListing, wrapAsync(listingController.update))
    .delete(isLogedIn, wrapAsync(listingController.destroy));


//edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;