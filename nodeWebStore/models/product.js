var mongoose= require("mongoose");
var Schema = mongoose.Schema;
    var productSchema = new mongoose.Schema({
      name: String,
      price: {type: Number, required: true} ,
      description: String,
      stock: Number,
      image: String,
      available: Boolean,
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],
      author:{
        id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
      }
    })

    module.exports = mongoose.model("Product", productSchema)
