var middleware={}
var Comment = require("../models/comment"),
    Product = require("../models/product")

middleware.isLoggedIn=function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }else{
    req.flash("error", "You need to be logged in")
    res.redirect("/login")
  }
}

middleware.commentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.c_id, function(err, comment){

      if(err){
        req.flash("error", "Database error!")
        res.redirect("back")

      }else if(comment.author.id.equals(req.user.id)){
        next()
      }else{
        req.flash("error", "You are not allowed to do this")
        res.redirect("back")
      }
    })
    }else{
      req.flash("error", "You need to be logged in")
      res.redirect("back")
    }
  }
middleware.producOwnership=function(req, res, next){
    if(req.isAuthenticated()){
      Product.findById(req.params.id, function(err, product){
        if(err){
          req.flash("error", "Database error!")
          res.redirect("back")
        }else if(product.author.id.equals(req.user._id)){
          next()
        }else{
          req.flash("error", "You are not allowed to do this")
          res.redirect("/products/"+req.params.id)
        }
      })
    }else{
      req.flash("error", "You need to be logged in")
      res.redirect("/login")
    }
  }

  middleware.userOwnership=function(req, res, next){
    if(req.isAuthenticated()){
      if(req.user._id.equals(req.params.id)){
        next()
      }else{
        res.redirect("/user/"+req.user._id)
      }
    }else{
      req.flash("error", "You need to be logged in")
      res.redirect("/login")
    }
  }

  module.exports=middleware
