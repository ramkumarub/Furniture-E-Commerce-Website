const { Schema, model } = require("mongoose")

const variantModel = new Schema({
    image : { type : String, required : true },
    color : { type : String, required : true },
    oldprice : { type : String },
    newprice : { type : String },
    stock : { type : Number, default : 1 },
    isFeatured : { type : Boolean, default : false }
})

const procuctModel = new Schema({
    name : { type : String, required : true, unique : true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    variants : [variantModel]
})

module.exports = model("Product", procuctModel)