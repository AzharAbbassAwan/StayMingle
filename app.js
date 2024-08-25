const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
require("dotenv").config();
const listings = require("./routes/listing.js");
const review = require("./routes/review.js");
const session = require("session");


//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


//MongoDB cluster url specified in .env file
const MONGO_URL = process.env.MONGODB_URI;
//port
const port = process.env.PORT;

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

app.use("/listings", listings);
app.use("/listings/:id/review", review)

app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page not found!"));
});

//middleware to handle errors using error calss
app.use((err, req, res, next) =>{
    //Default value of status code will be 500
    let {status = 500} = err;
    res.status(status).render("error.ejs", {err});

});

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
