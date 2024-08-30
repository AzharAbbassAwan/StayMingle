if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));

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

//using passport as middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demouser", async(req, res) =>{
//     let fakeUser = new User({
//         email: "azharsde1@gmail.com",
//         username: "nodejsLearner",
//     });

//     let registeredUser = await User.register(fakeUser, "azhar123");
//     res.send(registeredUser);
// });

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page not found!"));
});


app.use((err, req, res, next) =>{
   
    let {status = 500} = err;
    res.status(status).render("error.ejs", {err});

});

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
