const { Schema, model, default: mongoose } = require("mongoose")

const checkoutModel = new Schema({
    productId : [{ type : mongoose.Schema.Types.ObjectId, ref : "Product", required : true }],
    productName : [{ type : String, required : true }],
    productColor : [{ type : String, required : true }],
    productPrice : [{ type : String, required : true }],
    productQuantity : [{ type : Number, required : true }],
    totalPrice : { type : String, required : true },
    email : { type : String, required : true },
    fname : { type : String, required : true },
    lname : { type : String, required : true },
    selectedCountry : { type : String, required : true },
    houseNumber : { type : String, required : true },
    streetName : { type : String, required : true },
    town : { type : String, required : true },
    selectedState : { type : String, required : true},
    pincode : { type : String, required : true },
    number : { type : String, required : true },
    additionalInformation : { type : String },
    payment : { type : String, required : true}
})

module.exports = model("Checkout", checkoutModel)