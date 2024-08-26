const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync( async (req, res) =>{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registedUser = await User.register(newUser, password);
    console.log(registedUser);
    req.flash("success", "wellcome to StayMingle");
    res.redirect("/listings");
}))

module.exports = router;