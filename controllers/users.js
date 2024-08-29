const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) =>{
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
}

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) =>{
    req.flash("success", "Wellcome back to StayMingle");    
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};