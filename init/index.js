const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require('dotenv').config({ path: '../.env' });

//database uri
const MONGO_URL = process.env.MONGODB_URI;


main().then(() =>{
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

//initializing DB with demo data
const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:'66cc62ae25cadc7f2ece2940'}));
    await Listing.insertMany(initData.data);
    console.log("database initialized!");
};

initDB();