const Listing = require("../models/listing.js");
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim();
const axios = require('axios');
const { response } = require("express");
const apiKey = process.env.MAP_API_KEY;


module.exports.index = async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", 
        populate: {path: "author"},
    })
    .populate("owner");
    if(!listing){
    req.flash("error", "Listing you requested does not exist!");
    res.redirect("/listings");
    }

    try{
        var response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
            q: listing.location,
            key: apiKey
        }
        })
    }
    catch{
        (error => console.error(error));
    }
    let lattitude, longitude;
    if(response.data.results.length > 0){
    lattitude = await response.data.results[0].geometry.lat;
    longitude = await response.data.results[0].geometry.lng;
    }
    else{
        //setting default location to London if location is undfined.
        lattitude = 51.5072;
        longitude = 0.1276;
    }

    res.render("listings/show.ejs", {listing, lattitude, longitude});
};

module.exports.creat = async(req, res, next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    try{
        var response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
            q: newListing.location,
            key: apiKey
        }
        })
    }
    catch{
        (error => console.error(error));
    }
    let lattitude, longitude;
    if(response.data.results.length > 0){
    lattitude = await response.data.results[0].geometry.lat;
    longitude = await response.data.results[0].geometry.lng;
    }
    else{
        //setting default location to London if location is undfined.
        lattitude = 51.5072;
        longitude = 0.1276;
    }
    var geometry = new Array(2);
    geometry[0] = lattitude;
    geometry[1] = longitude;
    newListing.geometry.type = 'Point';
    newListing.geometry.coordinates = geometry;
    await newListing.save();
    req.flash("success", "New Listing Creatd");
    res.redirect("/listings");
};

module.exports.edit = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    
    if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
        }
    let orignalImageUrl = listing.image.url;
    orignalImageUrl.replace("/upload", "/upload/h_300, w_250");
    res.render("listings/edit.ejs", {listing, orignalImageUrl})
};

module.exports.update = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};