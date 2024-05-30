const Listing=require("../models/listing.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.Map_Token
const geocodingClient= mbxGeoCoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    let Lists=await Listing.find();
    res.render("listings/index.ejs",{Lists})
}


module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.createListing=async(req,res,next)=>{  
    let {title,description,image,price,location,country,category}=req.body;
    
    let response=await geocodingClient.forwardGeocode({
        query: location,
        limit: 1
      }).send()
      let Geo=response.body.features[0].geometry;
    let url=req.file.path;
    let filename=req.file.filename;

    
    // if (!title || !description || !price || !location || !country) {
    //     throw new ExpressError(400, "Please fill out all required fields");
    //   } //this error is for hoppscoth where if invalid data is sent
    let add=  new Listing({
    // title:`${title}`,
    // description:`${description}`,
    // price:`${price}`,
    // location:`${location}`,
    // country:`${country}`,
    // category:`${category}`,
    title,
    description,
    price,
    location,
    country,
    category,
    image: { url, filename },
    geometry: Geo,
    owner: req.user
});
// add.owner=req.user;
// add.image={url,filename}
// add.geometry=Geo;
// add.category=req.body.Listing.category;

let savedListing=await add.save();
console.log(savedListing);

req.flash('success','New Listing added');
res.redirect("/listings");                                                     
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let detail=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!detail){
        req.flash("error","Listing you requested for doesn't exist")
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{detail});
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let edit=await Listing.findById(id);
    if(!edit){
        req.flash("error","Listing you requested for doesn't exist")
        res.redirect("/listings");
    }
    let originalImageUrl=edit.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{edit,originalImageUrl});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let {title:title,description:des,image:img,price:pr,location:loc,country:cou}=req.body;
    let update=await Listing.findByIdAndUpdate(id,{title:title,description:des,image:img,price:pr,location:loc,country:cou},{new:true,runValidators:true});
    
    if(typeof req.file!== "undefined"){ //here,typeof is undefined
    let url=req.file.path;
    let filename=req.file.filename;
    update.image={url,filename};
    await update.save();
    }
    
    req.flash('success','Listing Updated');
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let del=await Listing.findByIdAndDelete(id);
    req.flash('success','Listing deleted');
    res.redirect("/listings");
}