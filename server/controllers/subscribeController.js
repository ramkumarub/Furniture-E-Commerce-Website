const express = require("express")
const nodemailer = require("nodemailer")
const subscribeModel = require("../models/subscribeModel")

// Send Subscribe Mail
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

// Get Subscribe Email
exports.getSubscribeEmail = (req, res) => {
    try {
        res.status(200).json({
            message : "Subscribe Email Received Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Post Subscribe Email
exports.postSubscribeEmail = async(req, res) => {
    try {
        const { email } = req.body

        const existingEmail = await subscribeModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({
                message : "Already Susbscribed"
            })
        }

        const subscribe = new subscribeModel({ email })
        await subscribe.save()

        res.status(200).json({
            message : "Subscribed Successfully! 🎉"
        })

        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : email,
            subject : "Subscription Successfull",
            html : `
                <div style = "font-family : Arial, sans-serif; padding : 20px;">
                    <h2>
                        Thanks For Subscribing!
                    </h2>
                <p>
                    You have successfully subscribed to our newsletter.
                </p>
                <p>
                    You will now receive updates, offers, and latest products.
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
            message : error.message
        })
    }
}

// Delete Subscribe Mail 
exports.deleteSubscribeEmail = async(req, res) => {
    try {
        const subscribeId = req.params.id
        const subscribe = await subscribeModel.findByIdAndDelete(subscribeId)

        res.status(200).json({
            message : "Subscribe Email Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error
        })
    }
}