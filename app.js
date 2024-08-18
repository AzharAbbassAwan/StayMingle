const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const MONGO_URL = "mongodb://127.0.0.1/staymingle";

main().then(() =>{
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) =>{
    res.send("Hi, I am root");
});

app.get("/listings", async (req, res) =>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings});
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//update route
app.put("listings/:id", async (req, res) =>{
    let {id} = req.params;
    Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})
//edit route
app.get("/listings/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
});


app.get("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//Create route
app.post("/listings", async (req, res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

// app.get("/testListing", async (req,res) =>{
//     let sampleListing = new Listing ({
//         title: "Safary Villas 2",
//         description: "Hilly areas",
//         price: 1120,
//         loacation: "Baheria town phase 7",
//         country : "Pakistan"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfully listening is created!");
// })

app.listen(8080, () => {
    console.log("server is listening to port 8080");
})