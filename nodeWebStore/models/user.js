var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

var userSchema=new mongoose.Schema({
  username:String,
  password:String,
  birthdate:String,
  hometown:String,
  sex:String,
  email:String
}, {collection: 'usuarios'})

userSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User", userSchema)
