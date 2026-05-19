const express = require("express")
const nodemailer = require("nodemailer")
const contactModel =  require("../models/contactModel")

// Receive Mail
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

// Get Details
exports.getContact = async(req, res) => {
    try {
        const { page = 1, limit} = req.query
        const skip = limit ? (Number(page) - 1) * Number(limit) : 0

        let contactQuery = contactModel.find().skip(skip)
        if (limit) {
            contactQuery = contactQuery.limit(Number(limit))
        }

        const contacts = await contactQuery
        const total = await contactModel.countDocuments()
        const totalPages = limit ? Math.ceil(total / Number(limit)) : 1

        res.status(200).json({
            message : "Records Receiced Successfully",
            total,
            page : Number(page),
            limit : limit ? Number(limit) : total,
            totalPages,
            data : contacts
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Post Details
exports.postContact = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body
        const contacts = new contactModel(req.body)
        await contacts.save()

        res.status(200).json({
            message : "Records Posted Successfully"
        })

        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : process.env.EMAIL_USER,
            replyTo : email,
            subject : `New Contact Form - ${subject}`,
            html : `
                <div style = "font-family : Arial, sans-serif; padding : 20px;">
                    <h2 style = "color : #000000">
                        New Contact Form Submission
                    </h2>
                    <hr/>
                    <p>
                        <strong>Name :</strong> ${name}
                    </p>
                    <p>
                        <strong>Email :</strong> ${email}
                    </p>
                    <p>
                        <strong>Subject :</strong> ${subject}
                    </p>
                    <div style = "background : #f4f4f4; padding : 15px; border-radius : 5px;">
                        ${message}
                    </div> 
                </div> 
            `
        })
    }
    catch (error)
    {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Details
exports.deleteContact = async(req, res) => {
    try {
        const contactId = req.params.id

        const contacts = await contactModel.findByIdAndDelete(contactId)

        res.status(200).json({
            message : "Records Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}