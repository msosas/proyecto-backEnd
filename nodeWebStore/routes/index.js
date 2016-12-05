var express     = require("express"),
    app         = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware  = require("../middleware")

app.get("/", function(req, res){
  res.redirect("/products")
})
/*=========================
      AUTH ROUTES
=========================*/

app.get("/register", function(req,res){
  res.render("register")
})

app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username})

  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message)
      return res.redirect("register")
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success","Succesfully created new user! Welcome "+req.user.username+"! ")
      res.redirect("/products")
    })
  })
})

app.get("/login", function(req, res){
res.render("login")
})

app.post("/login",passport.authenticate("local",{
    //successRedirect:"/products",
    failureRedirect:"/login",
    failureFlash: true,
    successFlash: "Welcome back!"
    }),function(res,req){
      console.log('logueado');
      req.sendStatus(200);
    })

app.get("/logout", function(req, res){
req.logout()
req.flash("success", "Succesfully Logged Out")
res.redirect("/products")
})

app.get("/user/:id", middleware.userOwnership, function(req, res){
  res.render("user")
})

app.put("/user/:id",middleware.userOwnership, function(req,res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err){
    if(err){
      req.flash("error", "Database Error!")
      res.redirect("/user/"+req.params.id)
    }else{
      req.flash("success", "Info Updated")
      res.redirect("/user/"+req.params.id)
    }
  })
})

module.exports=app
