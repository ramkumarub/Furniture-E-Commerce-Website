const { Schema, model } = require("mongoose")

const couponModel = new Schema({
    couponCode : { type : String, required : true, unique : true }
}, { timestamps : true })

module.exports = model("Coupon", couponModel)