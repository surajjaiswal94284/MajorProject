const Listing=require("../models/listing.js");

module.exports.search=async(req,res)=>{
    
    let {query}=req.query;
    let Lists=await Listing.find();
    res.render("search.ejs",{Lists,query})
}