// const express=require("express");
// const router=express.Router();
// // const Listing=require("../models/listing.js");
// const wrapAsync=require("../utils/wrapAsync.js");
// // const {checkLoggedin,isOwner,validateListing }=require("../middleware.js");
// const optionController=require("../controllers/options.js");
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const optionController = require('../controllers/options.js');

router.get("/trending",wrapAsync( optionController.trending));
router.get("/rooms",wrapAsync( optionController.rooms));
router.get("/iconic",wrapAsync( optionController.iconic));
router.get("/mountains",wrapAsync( optionController.mountains));
router.get("/castles",wrapAsync( optionController.castles));
router.get("/pools",wrapAsync( optionController.pools));
router.get("/camp",wrapAsync( optionController.camp));
router.get("/farms",wrapAsync( optionController.farms));
router.get("/arctic",wrapAsync( optionController.arctic));

module.exports = router;