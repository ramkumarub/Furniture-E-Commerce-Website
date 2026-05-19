const dotenv = require("dotenv").config()
const app = require("./app")
const connectDB =  require("./config/db")

app.listen(process.env.PORT, async() => {
    try {
        await connectDB()
        console.log("Server Connected Successfully")
    }
    catch (error) {
        console.log(error)
    }
})