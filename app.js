const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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