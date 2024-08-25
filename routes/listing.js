const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

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

router.get("/", wrapAsync(async (req, res) =>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings});
}));

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

//update route
router.put("/:id", validateListing, wrapAsync(async (req, res) =>{
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data!");
    }
    let {id} = req.params;
    Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/${id}`);
}));

//delete route
router.delete("/:id",wrapAsync(async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/");
}));

//edit route
router.get("/:id/edit",wrapAsync( async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
}));


router.get("/:id",wrapAsync(async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}));

//Create route
router.post("/",validateListing, wrapAsync(async(req, res, next) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Creatd");
    res.redirect("/");
})
);

module.exports = router;