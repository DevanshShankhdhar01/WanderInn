const express=require("express");
const router=express.Router({mergeParams:true});

const Listing = require('../models/listing.js');
const Review= require('../models/reviews.js');

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const {isLoggedIn,validateReview,isAuthor} = require("../middlewares.js");
const reviewController=require("../controllers/reviews.js");

// Post Route
router.post("/", validateReview , isLoggedIn , wrapAsync(reviewController.postReview));

// Delete Route for a Review

router.delete("/:reviewId", isLoggedIn, isAuthor ,wrapAsync(reviewController.destroyReview));

module.exports=router;