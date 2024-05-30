const mongoose=require('mongoose');
const reviews = require('./reviews');
const { application } = require('express');
const Schema=mongoose.Schema;

const listingSchema=Schema({
    title:{
        type:String,
        require:true
    },
    description:String,
    image:{
        url:String,
        filename:String    
    },
    country:String,
    location:String,
    price:Number,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    category:{
        type:String,
        enum:["Trending","Rooms","Iconic cities","Mountains","Castles","Amazing pools","Camping","Farms","Arctic"]
    }
});

//Deletion Handling
listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing){
        await reviews.deleteMany({_id:{$in:listing.reviews}})
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

