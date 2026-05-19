const express =  require("express")
const categoryModel = require("../models/categoryModel")

// Get Single Category
exports.getSingleCategory =  async(req, res) => {
    try {
        const categoryId = req.params.id
        const category = await categoryModel.findById(categoryId)

        if (!category) {
            return res.status(404).json({
                message : "Category Not Found",
            })
        }

        res.status(200).json({
            message : "Single Category Receivend Successfully",
            data : category
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message :  error.message
        })
    }
}
// Get Category
exports.getCategory = async(req, res) => {
    try {
        const { page = 1, limit, search = ""} = req.query
        const skip = limit ? (Number(page) - 1) * Number(limit) : 0

        let query = {}
        const escapeRegex = (text) => {
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }

        if (search) {
            const safeSearch = escapeRegex(search.trim())
            query.name = { $regex : safeSearch, $options : "i" }
        }

        let categoryQuery = categoryModel.find(query).skip(skip)
        if (limit) {
            categoryQuery = categoryQuery.limit(Number(limit))
        }
        const category = await categoryQuery
        const total = await categoryModel.countDocuments(query)
        const totalPages = limit ? Math.ceil(total / Number(limit)) : 1
        res.status(200).json({
            message : "Category Records Received Successfully",
            total,
            page : Number(page),
            limit : limit ? Number(limit) : total,
            totalPages,
            data : category
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Post Category
exports.postCategory = async(req, res) => {
    try {
        const { slug, ...rest } = req.body
        
        const existingCategory = await categoryModel.findOne({ slug })
        if (existingCategory) {
            return res.status(409).json({
                message : "Category Already Exists"
            })
        }
        if (Array.isArray(req.body)) {
            await categoryModel.insertMany(req.body)
        }
        else {
            const category = new categoryModel({
                ...rest,
                slug
            })
            await category.save()
        }
        res.status(200).json({
            message : "Category Records Created Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Put Category
exports.putCategory = async(req, res) => {
    try {
        const categoryId = req.params.id
        const categoryData = req.body

        const category = await categoryModel.findByIdAndUpdate(
            categoryId, 
            categoryData, 
            { 
                returnDocument: 'after',
                runValidators : true 
            }
        )
        
        res.status(200).json({
            message : "Category Records Updated Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Category
exports.deleteCategory =  async(req, res) => {
    try {
        const categoryId = req.params.id

        const category = await categoryModel.findByIdAndDelete(categoryId)

        res.status(200).json({
            message : "Category Records Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}