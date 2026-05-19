const express = require("express")
const productModel = require("../models/productModel")

// Get Single Product
exports.getSingleProduct = async(req, res) => {
    try {
        const productId = req.params.id
        const product = await productModel.findById(productId).populate("categories")

        if (!product) {
            return res.status(409).json({
                message : "Product Not Found"
            })
        }

        res.status(200).json({
            message : "Single Product Received Successfully",
            data : product
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Get Prodcuts
exports.getProducts = async(req, res) => {
    try {
        const { page = 1, limit, search = "" } = req.query
        const skip = limit ? (Number(page) - 1) * Number(limit) : 0

        let query = {}
        const escapeRegex = (text) => {
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }

        if (search) {
            const safeSearch = escapeRegex(search.trim())
            query.name = { $regex : safeSearch, $options : "i" }
        }

        let productQuery = productModel.find(query).skip(skip)
        if (limit) {
            productQuery = productQuery.limit(Number(limit))
        }

        const products = await productQuery
        const total = await productModel.countDocuments(query)
        const totalPages = limit ? Math.ceil(total / Number(limit)) : 1
        
        res.status(200).json({
            message : "Prodcuts Received Successfully",
            total,
            page : Number(page),
            limit : limit ? Number(limit) : total,
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

// Post Prodcuts
exports.postProducts = async(req, res) => {
    try {
        const { name, ...rest } = req.body

        const existingProduct = await productModel.findOne({ name })
        if (existingProduct) {
            return res.status(409).json({
                message : "Product Already Exists"
            })
        }

        if (Array.isArray(req.body)) {
            await productModel.insertMany(req.body)
        }
        else {
            const products = new productModel({
                ...rest,
                name
            })
            await products.save()
        }

        res.status(200).json({
            message : "Prodcuts Created Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Put Prodcuts
exports.putProducts = async(req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body

        const products = await productModel.findByIdAndUpdate(productId, productData)

        res.status(200).json({
            message : "Prodcuts Updated Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Prodcuts
exports.deleteProducts = async(req, res) => {
    try {
        const productId = req.params.id

        const products = await productModel.findByIdAndDelete(productId)

        res.status(200).json({
            message : "Prodcuts Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Put Variants
exports.putOrPostVariant = async(req, res) => {
    try {
        const { productId, variantId } =  req.params

        let updatedProduct
        if (variantId) {
            updatedProduct = await productModel.findOneAndUpdate(
                {
                    _id : productId,
                    "variants._id" : variantId
                },
                {
                    $set : {
                        "variants.$.image" : req.body.image,
                        "variants.$.color" : req.body.color,
                        "variants.$.oldprice" : req.body.oldprice,
                        "variants.$.newprice" : req.body.newprice
                    }
                },
                { new : true },
                { runValidators : true }
            )
        }
        else {
            updatedProduct = await productModel.findByIdAndUpdate(
                productId,
                {
                    $push : {
                        variants : req.body
                    }
                },
                { new : true },
                { runValidators : true }
            )
        }

        if (!updatedProduct) {
            return res.status(404).json({
                message : "Product Not Found"
            })
        }

        res.status(200).json({
            message : variantId ? "Variant Updated Successfully" : "Variant Added Successfully",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Delete Variant
exports.deleteVariant = async(req, res) => {
    try { 
        const { productId, variantId } = req.params

        const deleteProduct = await productModel.findByIdAndUpdate(
            productId,
            {
                $pull : {
                    variants : {
                        _id : variantId
                    }
                }
            }
        )

        if (!deleteProduct) {
            return res.status(404).json({
                message : "Product Not Found"
            })
        }

        res.status(200).json({
            message : "Variant Deleted Successfully",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Update Stock
exports.updateStock = async(req, res) => {
    try {
        const { productId, variantId } = req.params
        const qty = Number(req.body.stock)

        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({
                message : "Invalid Stock Value"
            })
        }

        const product = await productModel.findOne( { _id : productId, "variants._id" : variantId } )
        const variant = product.variants.id(variantId)
        if (variant.stock < qty) {
            return res.status(400).json({
                message : "Not Enough Stock Available"
            })
        }

        const updatedProduct = await productModel.findOneAndUpdate(
            {
                _id : productId,
                "variants._id" : variantId,
            },
            {
                $inc : {
                    "variants.$.stock" : -qty
                }
            },
            { 
                returnDocument: 'after',
                runValidators : true 
            }
        )

        if (!updatedProduct) {
            return res.status(400).json({
                message: "Product or Variant Not Found"
            });
        }   

        res.status(200).json({
            message : "Stock Updated Successfully",
            data : updatedProduct
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Update New Stock
exports.updateNewStock = async(req, res) => {
    try {
        const { productId, variantId } = req.params
        const { stock } = req.body

        const newStock = Number(stock)
        if (isNaN(newStock) || newStock <= 0) {
            return res.status(400).json({
                message : "Invalid Stock Value"
            })
        }

        const updatedProduct = await productModel.findOneAndUpdate(
            {
                _id : productId,
                "variants._id" : variantId
            },
            {
                $set : {
                    "variants.$.stock" : newStock
                }
            },
            { 
                returnDocument: 'after',
                runValidators : true 
            }
        )
        if (!updatedProduct) {
            return res.status(400).json({
                message : "Product or Variant Not Found"
            })
        }

        res.status(200).json({
            message : "Stock Updated Successfully",
            data : updatedProduct 
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}