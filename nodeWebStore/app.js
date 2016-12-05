var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    Product         = require("./models/product.js"),
    Comment         = require("./models/comment.js"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    productRoutes   = require("./routes/product"),
    commentRoutes   = require("./routes/comment"),
    indexRoutes     = require("./routes/index"),
    flash           = require("connect-flash")

  mongoose.connect("mongodb://localhost/web_store")
  app.set("view engine", "ejs")
  app.use(express.static("public"))
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(methodOverride("_method"))
  app.use(flash())

  /*=========================
      PASSPORT CONFIG
  =========================*/

  app.use(require("express-session")({
    secret:"ksdjflskf sfsdjfdsk fjds fdsñkf jñsflk sñfl skdfjsdfñlkjsf dsafds afsfj",
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new localStrategy(User.authenticate()))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

  app.use(function(req, res, next){
    res.locals.currentUser=req.user
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
  })

    /*=========================
              ROUTES
    =========================*/

  app.use(indexRoutes)
  app.use("/products", productRoutes)
  app.use("/products/:id/comments", commentRoutes)

  app.listen(8001, function(){
    console.log("funca!")
})


module.exports = app ; // Para testear