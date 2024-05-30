const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {checkLoggedin,isOwner,validateListing }=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage }=require("../cloudConfig.js");
const upload = multer({ storage })

// Define a route on the router object
//Index Route(Show all)
router.get("/",wrapAsync(listingController.index));

// router.get("/trending",wrapAsync(listingController.trending));
// router.get("/rooms",wrapAsync(listingController.rooms));
// router.get("/iconic",wrapAsync(listingController.iconic));
// router.get("/mountains",wrapAsync(listingController.mountains));
// router.get("/castles",wrapAsync(listingController.castles));
// router.get("/pools",wrapAsync(listingController.pools));
// router.get("/camp",wrapAsync(listingController.camp));
// router.get("/farms",wrapAsync(listingController.farms));
// router.get("/arctic",wrapAsync(listingController.arctic));

//Create new
 router.get("/new",checkLoggedin,listingController.renderNewForm);

 
 router.post("/",upload.single("image"),validateListing,wrapAsync(listingController.createListing));


//Show Route(Show detail of particular id)
router.get("/:id",wrapAsync(listingController.showListing))

//Edit Route
router.get("/:id/edit",checkLoggedin,isOwner,wrapAsync(listingController.renderEditForm))

//Update Route
router.patch("/:id",checkLoggedin,isOwner,upload.single("image"),validateListing,wrapAsync(listingController.updateListing))

//Delete Route
router.delete("/:id",checkLoggedin,isOwner,wrapAsync(listingController.deleteListing))

module.exports=router;