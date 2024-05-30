const Listing=require("./models/listing");
const Review=require("./models/reviews");
const ExpressError=require("./utils/expressError.js");
const {listingSchema}=require("./Schema.js");
const {reviewSchema}=require("./Schema.js");


//Making the middleware which can check
//the status(logged in) of user.
module.exports.checkLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl; // Save the original URL
        req.flash("error","You need to logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo=req.session.returnTo;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You're not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You're not the owner of this review");
        return res.redirect(`/listings/${id}`)
    }
    next();
}


module.exports.validateListing = (req, res, next) => {
    const { title, description, image, price, location, country } = req.body;

    const { error } = listingSchema.validate({Listing:{ title, description, image, price, location, country }});
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const {rating,comment } = req.body;

    const { error } = reviewSchema.validate({Review:{ rating,comment }});
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};
