const Listing = require('../models/listing.js');
const Review= require('../models/reviews.js');

module.exports.postReview = async(req,res)=>{
    const { id } = req.params;
    
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    
    newReview.author = req.user._id; // Assuming req.user is set by passport
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added Successfully");
    res.redirect(`/listings/${id}`);   
    
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId}=req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
}

