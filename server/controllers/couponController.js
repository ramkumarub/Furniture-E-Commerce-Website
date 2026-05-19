const express = require("express")
const couponModel = require("../models/couponModel")

// Post Coupon
exports.postCoupon = async(req, res) => {
    try {
        const { couponCode } = req.body

        const existingCoupon = await couponModel.findOne({ couponCode })
        if (existingCoupon) {
            return res.status(409).json({
                message : "Coupon Code Already Exists"
            })
        }
        const coupons = new couponModel(req.body)
        await coupons.save()

        res.status(200).json({
            message : "Coupon Code Applied Successfully! 🎉"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}