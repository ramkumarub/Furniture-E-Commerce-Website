const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

module.exports = async(req, res, next) => {
    try {
        let authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(404).json({
                message : "No Token Found"
            })
        }

        let token = authHeader.split(" ")[1]
        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const users = await userModel.findById(verifyToken.id)
        if (!users) {
            return res.status(404).json({
                message : "Account No Longer Exists"
            })
        }
        
        req.user = verifyToken
        next()
    }
    catch(error) {
        console.log(error)
        res.status(401).json({
            message : "Invalid or Expired Token"
        })
    }
}