const { Schema, model } = require("mongoose")

const subscribeModel = new Schema({
    email : { type : String, required : true, unique : true }
}, { timestamps : true })

module.exports = model("Subscribe", subscribeModel)