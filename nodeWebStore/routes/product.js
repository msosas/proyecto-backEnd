var express=require("express"),
    app=express.Router(),
    Product=require("../models/product"),
    middleware=require("../middleware")

app.get("/", function(req, res){
  Product.find({}, function(err, products){
    if(err){
      res.render("error")
    }else{
    res.render("index", {products:products})
  }
  })

});

app.get("/todos", function(req, res){
  Product.find({}, function(err, products){
    if(err){
      res.render("error")
    }else{
    res.send(products);
  }
  })

});

app.get("/new",middleware.isLoggedIn, function(req, res){
  res.render("new")
})

app.post("/", middleware.isLoggedIn, function(req, res){
  var product=req.body.product
  var author={
    id:req.user._id,
    username: req.user.username
  }
  product.author=author
  product.available=!!Number(product.stock)
  Product.create(req.body.product, function(err, doc){
    if(err){
      console.log(err);
      // res.render("error")
      res.sendStatus(500);
    }else{
      //res.redirect("/products")
      res.sendStatus(200);
    }
  })

})

app.get("/:id", function(req, res){
  Product.findById(req.params.id).populate("comments").exec(function(err, product){
    if(err){
      res.render("error")
    }else{
      res.render("show", {product:product})
    }
  })
})

app.get("/:id/edit", middleware.producOwnership, function(req, res){
  Product.findById(req.params.id, function(err, foundProduct){
    if(err){
      res.render("error")
    }else{
      res.render("edit", {product:foundProduct})
    }
  })
})

app.put("/:id", middleware.producOwnership, function(req, res){
  var product=req.body.product
  product.available=!!Number(product.stock)
  Product.findByIdAndUpdate(req.params.id, product, function(err){
    if(err){
      res.render("error")
    }else{
      res.redirect("/products/"+req.params.id)
    }
  })
})

app.delete("/:id",  middleware.producOwnership, function(req, res){
  Product.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.render("error")
    }else{
    res.redirect("/products")
    }
  })
})



module.exports=app
