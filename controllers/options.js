const Listing=require("../models/listing.js");

module.exports.trending=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/trending.ejs",{Lists})
}
module.exports.rooms=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/rooms.ejs",{Lists})
}
module.exports.iconic=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/iconic.ejs",{Lists})
}
module.exports.mountains=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/mountains.ejs",{Lists})
}
module.exports.castles=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/castles.ejs",{Lists})
}
module.exports.pools=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/pools.ejs",{Lists})
}
module.exports.camp=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/camp.ejs",{Lists})
}
module.exports.farms=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/farms.ejs",{Lists})
}
module.exports.arctic=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("options/arctic.ejs",{Lists})
}
