const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync( async (req, res, next) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username, password});
        const registedUser = await User.register(newUser, password);
        await req.login(registedUser, function(err) {
            if(err){
               return next(err);
            }
            req.flash("success", "wellcome to StayMingle");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login", (req, res) =>{
    res.render("users/login.ejs");
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{ 
    failureRedirect: "/login",
    failureFlash: true}),
    async (req, res) =>{
    req.flash("success", "Wellcome back to StayMingle");    
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout",
    (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;