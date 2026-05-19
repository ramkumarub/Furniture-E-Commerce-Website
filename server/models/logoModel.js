const { Schema, model } = require("mongoose")

const logoModel = new Schema({
    image : { type : String, required : true }
})

module.exports = model("Logo", logoModel)