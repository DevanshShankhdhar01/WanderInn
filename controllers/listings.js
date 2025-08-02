const Listing = require('../models/listing.js');

module.exports.index=async (req, res) => {
    try{
        const alllistings=await Listing.find({});
        res.render("listings/index.ejs", { alllistings });  
    }
    catch(err){
        next(err);
    }
        
};
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");

};
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const newlisting = await Listing.findById(id).
    populate({path:"reviews",populate:{path:"author"}}).
    populate("owner");
    
    console.log(newlisting);
    if (!newlisting) {
        req.flash("error", "This Listing does not exist");
        res.redirect("/listings");
    }
    else{
      res.render("listings/show.ejs", { listing:newlisting });
    }
} ;

module.exports.postNewListing = async(req, res, next) => {
    
    let url=req.file.path;
    let filename=req.file.filename;
    if(!req.body || Object.keys(req.body).length === 0){
        throw new ExpressError(400,"Send Valid data for Listing");
    }
    
    const { title, description, price, location, country, image } = req.body;
    const newListing = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        image: {
            url: url,
            filename: filename
        }
    });

    newListing.owner = req.user._id; // Set the owner to the current user
    
    await newListing.save();
    req.flash("success", "New Listing Created Successfully");
    
    res.redirect("/listings");

    
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "This Listing does not exist!!");
        res.redirect("/listings");
    }
    else{
        let originalImageUrl = listing.image.url;
        originalImageUrl=originalImageUrl.replace("upload/", "upload/w_250/");
      res.render("listings/edit.ejs", { listing, originalImageUrl });
    }
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const origlisting = await Listing.findById(id);
    
    if (!origlisting) {
        req.flash("error", "This Listing does not exist");
        res.redirect("/listings");
    }
    
    
    const { title, description, price, location, image } = req.body;
    if(!req.body || Object.keys(req.body).length === 0){
        throw new ExpressError(400,"Send Valid data for Listing");
    }
    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        { price: price ,
          title: title,
          description: description,
          location: location,
        }, 
        { new: true, runValidators: true }
    );
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        updatedListing.image.url=url;
        updatedListing.image.filename=filename;
    }   
    await updatedListing.save();
    req.flash("success", "Changes Saved Successfully");
    res.redirect(`/listings`);

};
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
};

