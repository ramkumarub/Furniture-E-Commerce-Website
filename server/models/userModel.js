const { Schema, model } = require("mongoose")

const userModel = new Schema({
    name : { type : String, required : true },
    email : { type : String, required : true, unique : true },
    password  : { type : String, required : true },
    isLoggenIn : { type : Boolean, default : false }
}, { timestamps : true })

module.exports = model("User", userModel)