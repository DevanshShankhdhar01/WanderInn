const Listing= require('./models/listing.js');
const Review= require('./models/reviews.js');
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        if (req.method === "GET") {
            req.session.redirectUrl = req.originalUrl;  // Save the original URL
        }
        

        req.flash("error","You must be logged in!!");
        return res.redirect("/users/login"); // Redirect to login page
    }
    next();
};          
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
    const { id } = req.params;
    const origlisting = await Listing.findById(id);
   if(!req.user._id.equals(origlisting.owner._id)){
       req.flash("error", "You are not the owner of this Listing");
       return res.redirect(`/listings/${id}`);
   }
   next();
};

module.exports.isAuthor=async (req,res,next)=>{
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect("/listings");
    }
   if(!req.user._id.equals(review.author._id)){
       req.flash("error", "You are not the author of this Review");
       return res.redirect(`/listings/${id}`);
   }
   next();
};

module.exports.validateListing= (req,res,next)=>{
    let {error}= listingSchema.validate(req.body,{ abortEarly: false });

    if(error){
        const errMsg= error.details.map(el=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

module.exports.validateReview= (req,res,next)=>{
    let {error}= reviewSchema.validate(req.body,{ abortEarly: false });

    if(error){
        const errMsg= error.details.map(el=>el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}
