const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");

module.exports.createReview=async(req,res)=>{
    let {id}=req.params;
    let { comment, rating } = req.body;
    //Creating _id(review coll.) in listing
    let newReview=new Review({comment,rating});//First of all we've to create a review.
    let listing=await Listing.findById(id);//It retrieves a document from the database that matches the specified _id.
    newReview.author=req.user;
    // console.log(newReview);
    listing.reviews.push(newReview);

    await  newReview.save();//Maintin this order only
    await listing.save();
    req.flash('success','New Review created');
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review deleted');
    res.redirect(`/listings/${id}`);
}