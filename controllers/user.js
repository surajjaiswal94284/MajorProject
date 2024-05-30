const User=require("../models/user");

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({
        username:username,
        email:email
    })
    const registeredUser=await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    })
    }catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
    
}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=(req, res) => {
    req.flash("success","Welcome to WanderLust");
    const returnTo = res.locals.returnTo || '/listings'; // Get the original URL from the session or default to home
    res.redirect(returnTo);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you logged out");
        res.redirect("/listings");
    })
}