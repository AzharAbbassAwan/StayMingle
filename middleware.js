module.exports.isLogedIn = (req, res, next) =>{
    if(! req.isAuthenticated()){
        req.flash("error", "You must be logged in to create, update or delete the listing");
        return res.redirect("/login");
    }
    next();
}