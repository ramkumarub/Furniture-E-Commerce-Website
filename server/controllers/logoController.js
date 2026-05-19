const express = require("express")
const logoModel = require("../models/logoModel")

// Get Single Logo
exports.getSingleLogo = async(req, res) => {
    try {
        const logoId = req.params.id
        const logos = await logoModel.findById(logoId)

        res.status(200).json({
            message : "Received Successfully",
            data : logos
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message  : error.message
        })
    }
}

// Get Logos
exports.getLogo = async(req, res) => {
    try {
        const logos = await logoModel.find()

        res.status(200).json({
            message : "Received Successfully",
            data : logos
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Post Logo
exports.postLogo = async(req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await logoModel.insertMany(req.body)
        }
        else { 
            const logos = new logoModel(req.body)
            await logos.save()
        }

        res.status(200).json({
            message : "Posted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Put Logos
exports.putLogo = async(req, res) => {
    try {
        const logoId = req.params.id
        const logoData = req.body

        const logos = await logoModel.findByIdAndUpdate(
            logoId, 
            logoData,
            { 
                returnDocument: 'after',
                runValidators : true 
            }
        )

        res.status(200).json({
            message : "Updated Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Logo
exports.deleteLogo = async(req, res) => {
    try {
        const logoId = req.params.id

        const logos = await logoModel.findByIdAndDelete(logoId)

        res.status(200).json({
            message : "Deleted Successfully"
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