const mongoose=require('mongoose');
const initData=require("./data.js");
const Listing=require("../models/listing.js")
main().then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
}
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"664db91f235f0f0a7ab431a5"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();

//The spread operator (...obj) is used to create a shallow copy of each object in the array.
// This means that all the properties of the original object (obj) are copied into a new object.

//Full Process
// Iterate over initData.data:

// The map function iterates over each object in the initData.data array.
// Create a New Object for Each Element:

// For each object in the array, a new object is created using the spread operator to copy existing properties.
// The owner property is added or updated in the new object with the specified value.
// Return the New Array:

// The map function returns a new array of objects, where each object includes all the properties of the original object plus the new owner property.
// Assign the New Array to initData.data:

// The new array returned by map is assigned back to initData.data, replacing the original array.