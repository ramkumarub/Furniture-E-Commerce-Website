const express = require("express")
const productModel = require("../models/productModel")
const categoryModel = require("../models/categoryModel")

// Get Product By Category
exports.getProductCategory = async(req, res) => {
    try {
        const { slug } = req.params

        const { page = 1, limit, search = "" } = req.query
        const skip = (Number(page) - 1) * (Number(limit))

        let query = {}
        const escapeRegex = (text) => {
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }

        if (search) {
            const safeSearch = escapeRegex(search.trim())
            query.name = { $regex : safeSearch, $options : "i" }
        }

        const category = await categoryModel.findOne({ slug })
        if (!category) {
            return res.status(404).json({
                message : "Category Not Found"
            })
        }

        const products = await productModel.find({
            categories : { $in: [category._id] },
            ...query
        })
        .populate("categories")
        .skip(skip)
        .limit(Number(limit))
        const total = await productModel.countDocuments({
            categories : { $in: [category._id] },
            ...query
        })
        const totalPages = Math.ceil(total / Number(limit))

        res.status(200).json({
            message : "Products Received Successfully",
            total,
            page : Number(page),
            limit : Number(limit),
            totalPages,
            data : products
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}