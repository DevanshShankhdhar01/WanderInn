const joi=require("joi");
const listingSchema=joi.object({
    title : joi.string().min(3).max(30).required(),
    description:joi.string().min(10).max(100).required(),
    price:joi.number().required().min(1),
    location:joi.string().required(),
    country:joi.string().required(),
    image:joi.string().allow("",null)
});
const reviewSchema=joi.object({
    review:joi.object({
        comment:joi.string().required(),
        rating:joi.number().required().min(1).max(5)
    }).required()
    
    
});
module.exports = { reviewSchema,listingSchema };
// module.exports=listingSchema;
// module.exports=reviewSchema;
