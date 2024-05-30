const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {checkLoggedin,isReviewAuthor,validateReview}=require("../middleware.js");
const reviewControllers=require("../controllers/review.js");

//Review Route
router.post("/",checkLoggedin,validateReview,wrapAsync(reviewControllers.createReview));

//Delete Review Route
router.delete("/:reviewId",checkLoggedin,isReviewAuthor,wrapAsync(reviewControllers.deleteReview))

module.exports=router;

