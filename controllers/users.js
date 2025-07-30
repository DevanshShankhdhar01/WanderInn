const User = require('../models/user.js');
const passport = require("passport");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderInn!");
            res.redirect("/listings");
        });        
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/users/signup");
    }

};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login =  async(req, res) => {
    const redirectUrl = res.locals.redirectUrl || "/listings";
    req.flash("success", "Welcome to WanderInn! You are now logged in.");
    res.redirect(redirectUrl);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
         req.flash("success", "You are now logged out!");
        res.redirect("/listings");
    });
   

};