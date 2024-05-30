const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true   
    }
});

userSchema.plugin(passportLocalMongoose);//Automatically adds fields for username, hashing,
// and salting, along with methods to authenticate, hash, and compare passwords.


module.exports = mongoose.model('User',userSchema);