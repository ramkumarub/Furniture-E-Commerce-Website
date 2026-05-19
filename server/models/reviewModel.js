const { Schema, model, default: mongoose } = require("mongoose")

const reviewModel = new Schema({
    productId : { type : mongoose.Schema.Types.ObjectId, ref : "Product", required : true },
    productName : { type : String, required : true },
    name : { type : String, required : true },
    email : { type : String, required : true },
    review : { type : String, required : true },
    rating : { type : Number, required : true, min : 1, max : 5 }
}, { timestamps : true })

module.exports = model("Review", reviewModel)