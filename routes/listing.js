const express=require("express");
const router=express.Router();

const Listing = require('../models/listing.js');
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middlewares.js");

const listingController=require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({ storage});




router.route("/").
    get(listingController.index). //Index Route for Listings
    post( validateListing ,isLoggedIn, upload.single("image") , wrapAsync(listingController.postNewListing)); // Create Route for saving a new Listing
    

// New Route for creating a Listing

router.get("/new", isLoggedIn , listingController.renderNewForm);

router.route("/:id").
    get(validateListing , wrapAsync(listingController.showListing)). // Show Route for a single Listing
    put(isLoggedIn ,isOwner, upload.single("image"), validateListing  , wrapAsync(listingController.updateListing)). // Update Route for saving changes to a Listing
    delete(isLoggedIn ,isOwner, wrapAsync(listingController.deleteListing)); // Destroy Route

// Edit Route for a Listing

router.get("/:id/edit", isLoggedIn, isOwner ,wrapAsync(listingController.renderEditForm));

module.exports = router;