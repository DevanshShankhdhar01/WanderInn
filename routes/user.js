const express=require("express");
const router=express.Router({mergeParams:true});
const User = require('../models/user.js');
const passport = require("passport");

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {saveRedirectUrl} = require("../middlewares.js");

const userController=require("../controllers/users.js");

router.route("/signup").
    get(userController.renderSignUpForm).
    post(saveRedirectUrl,wrapAsync(userController.signUp));

router.route("/login").
    get(userController.renderLoginForm).
    post(saveRedirectUrl,passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true
}),userController.login);


router.get("/logout",userController.logOut);


module.exports=router;