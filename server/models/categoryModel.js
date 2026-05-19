const { Schema, model } = require("mongoose")

const categoryModel = new Schema({
    name : { type : String},
    slug  : { type : String, required : true, unique : true },
    image : { type : String },
    productCount : { type : Number }
}, { timestamps : true })

module.exports = model("Category", categoryModel)