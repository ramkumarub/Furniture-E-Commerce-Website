const express = require("express")
const reviewModel = require("../models/reviewModel")

// Get Review
exports.getReview = async(req, res) => {
    try {
        const { page = 1, limit } = req.query
        const skip = limit ? (Number(page) - 1) * Number(limit) : 0

        let reviewQuery = reviewModel.find().skip(skip)
        if (limit) {
            reviewQuery = reviewQuery.limit(Number(limit))
        }

        const review = await reviewQuery
        const total = await reviewModel.countDocuments()
        const totalPages = limit ? Math.ceil(total / Number(limit)) : 1

        res.status(200).json({
            message : "Reviews Received Successfully",
            total,
            page : Number(page),
            limit : limit ? Number(limit) : total,
            totalPages,
            data : review 
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}
// Post Review
exports.postReview = async(req, res) => {
    try {
        const { productId, email, ...rest } = req.body

        const existingReview = await reviewModel.findOne({
            productId,
            email
        })
        if (existingReview) {
            return res.status(400).json({
                message : "You have already reviewed the product"
            })
        }

        const review = new reviewModel({
            ...rest,
            productId,
            email
        })
        await review.save()

        res.status(200).json({
            message : "Review Submitted Successfully 🎉"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Review
exports.deleteReview = async(req, res) => {
    try {
        const reviewId = req.params.id

        const review = await reviewModel.findByIdAndDelete(reviewId)

        res.status(200).json({
            message : "Review Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}