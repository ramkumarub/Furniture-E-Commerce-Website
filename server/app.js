const express =  require("express")
const app = express()
const cors = require("cors")
const userRoute = require("./routes/userRoutes")
const subscribeRoute = require("./routes/subscribeRoute")
const categoryRoute = require("./routes/categoryRoute")
const productRoute = require("./routes/productRoute")
const productCategoryRoute = require("./routes/productCategoryRoute")
const logoRoute = require("./routes/logoRoute")
const contactRoute =  require("./routes/contactRoute")
const reviewRoute = require("./routes/reviewRoute")
const couponRoute = require("./routes/couponRoute")
const checkoutRoute = require("./routes/checkoutRoute")

app.use(cors())
app.use(express.json())

// Users Route
app.use("/api/users/", userRoute)

// Subscribe Email route
app.use("/api/subscribe", subscribeRoute)

// Categories Route
app.use("/api/categories", categoryRoute)

// Products Route
app.use("/api/products", productRoute)

// Product Category Route
app.use("/api/products/categories", productCategoryRoute)

// Logo Route
app.use("/api/logos", logoRoute)

// Contact Route
app.use("/api/contacts", contactRoute)

// Review Route
app.use("/api/reviews", reviewRoute)

// Coupon Route
app.use("/api/coupons", couponRoute)

// Checkout Route
app.use("/api/checkouts", checkoutRoute)

module.exports = app