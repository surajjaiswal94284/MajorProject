if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const wrapAsync=require("./utils/wrapAsync.js");

const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/expressError.js");

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const users=require("./routes/user.js");
const options=require("./routes/options.js");
const search=require("./routes/search.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")

const dbURL=process.env.ATLASDB_URL
const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600 //this is used to update our session information within 24hrs
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
}


//Session
app.use(session(sessionOptions));
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//-------
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
})

//Creating fake user
// app.get("/demo",async(req,res)=>{
//     let fakeUser=new User({
//         email:"suraj@gmail.com",
//         username:"Suraj"
//     });
//     let registeredUser=await User.register(fakeUser,"hello");
//     res.send(registeredUser);
// })




main().then(()=>{
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    
  await mongoose.connect(dbURL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));

app.use(methodOverride("_method"));

app.engine("ejs",ejsMate)

//Restructuring our code
// Mount the router onto a path in the main application
app.use("/listings",listings); //listings route
app.use("/listings/:id/review",reviews);//review route
app.use("/",users); //users route
app.use("/",options); //options route
app.use("/",search); //search route

app.all("*",(req,res,next)=>{ //this is for when user search for unknown route
    next(new ExpressError(404,"Page Not Found"));
})
app.use((err,req,res,next)=>{
    let {status=500,message="Something Went Wrong"}=err;
    res.render("error.ejs",{message});
    
})
app.listen(3000,()=>{
    console.log("Server is listening to ",port);
})
