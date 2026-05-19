const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const nodemailer = require("nodemailer")

// Signup Mail
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

// Signup
exports.signUp = async(req, res) => {
    try {
        const { password, ...rest } = req.body
        
        const existingAccount = await userModel.findOne({ email : rest.email })
        if (existingAccount) {
            return res.status(409).json({
                success : false,
                message : "Account Already Exists"
            })
        }

        const hash = await bcrypt.hash(password, 10)
        const user = new userModel({
            ...rest,
            password : hash
        })
        await user.save()

        const token = jwt.sign(
            { id : user._id },
            process.env.JWT_SECRET,
            { expiresIn : "1d" }
        )

        res.status(200).json({
            success : true,
            message : "Signed Up Successfully 🎉",
            token,
            user
        })

        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : rest.email,
            subject : "Account Created Successfully 🎉",
            html : `
                <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
                    <h2 style="color: #333;">
                        Welcome to Our Furniture Store!
                    </h2>
                    <p>
                        Your account has been created successfully.
                    </p>
                    <p>
                        You can now log in and explore our latest furniture collections, offers, and exclusive products.
                    </p>
                    <p>
                        Thank you for joining us. We’re excited to have you with us!
                    </p>
                    <img  src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png"
                    alt="Furniture Store Logo"  style="width: 180px; margin-top: 20px;" />
                </div>
            `
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// Login
exports.logIn = async(req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User No Found" 
            })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({
                success : false,
                message : "Invalid Password"
            })
        }

        // const payload = dbUser.toObject()
        // delete payload.password

        const token = jwt.sign(
            { id : user._id },
            process.env.JWT_SECRET,
            { expiresIn : "1d" }
        )

        res.status(200).json({
            success : true,
            message : "Logged In Successfully 🎉",
            token,
            user
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// Logout
exports.logout = async(req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User Does Not Found" 
            })
        }
    
        res.status(200).json({
            success : true,
            message : "Logged Out Successfully 🎉"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}