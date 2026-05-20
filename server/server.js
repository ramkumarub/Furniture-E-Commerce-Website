const dotenv = require("dotenv").config()
const app = require("./app")
const connectDB =  require("./config/db")

// app.listen(process.env.PORT, async() => {
//     try {
//         await connectDB()
//         console.log("Server Connected Successfully")
//     }
//     catch (error) {
//         console.log(error)
//     }
// })
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