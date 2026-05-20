const dotenv = require("dotenv").config()
const app = require("./app")
const connectDB =  require("./config/db")

const startServer = async() =>{
    try {
        await connectDB()
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}

startServer()