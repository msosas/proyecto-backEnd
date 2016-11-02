var express     = require("express"),
    app         = express.Router({mergeParams:true}),
    Product     = require("../models/product"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware")



app.post("/", middleware.isLoggedIn, function(req, res){
      var author={
        id:req.user._id,
        username:req.user.username
      }
      var body=req.body.body
      Product.findById(req.params.id, function(err, product){
        if(err){
          res.render(error)
        }else{
          Comment.create({body:body, author:author}, function(err, comment){
            if(err){
              res.render(error)
            }else{
          product.comments.unshift(comment)
          product.save()
          res.redirect("/products/"+req.params.id)
        }
      })
    }
  })
})

app.put("/:c_id", middleware.commentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.c_id, req.body.comment, function(err, comment){
    if(err){
      res.render("error")
    }else{
      res.redirect("/products/"+req.params.id)
    }
  })
})

app.delete("/:c_id",middleware.commentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.c_id,  function(err){
    if(err){
      res.render(error)
    }else{
      res.redirect("/products/"+req.params.id)
    }
  }
)
})



module.exports=app
