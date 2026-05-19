const express = require("express")
const checkoutModel = require("../models/checkoutModel")
const nodemailer = require("nodemailer")

// Order Placed Mail
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

// Get Single Order
exports.getSingleCheckout = async(req, res) => {
    try {
        const checkoutId = req.params.id

        const checkout = await checkoutModel.findById(checkoutId)
        if (!checkout) {
            return res.status(404).json({
                message : "Order Not Found"
            })
        }

        res.status(200).json({
            message : "Checkout Record Fetched Successfully",
            data : checkout
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Get Orders
exports.getCheckout = async(req, res) => {
    try {
        const { page = 1, limit } = req.query
        const skip = limit ? (Number(page) - 1) * Number(limit) : 0

        let checkoutQuery = checkoutModel.find().skip(skip)
        if (limit) {
            checkoutQuery = checkoutQuery.limit(Number(limit))
        }

        const checkout = await checkoutQuery
        const total = await checkoutModel.countDocuments()
        const totalPages = limit ? Math.ceil(total/ Number(limit)) : 1
        
        res.status(200).json({
            message : "Checkout Records Fetched Successfully",
            total,
            page : Number(page),
            limit : limit ? Number(limit) : total,
            totalPages,
            data : checkout
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

// Post Order
exports.postCheckout = async(req, res) => {
    try {
        const { productId, ...rest } = req.body
        
        const checkout = new checkoutModel({
            ...rest,
            productId
        })
        await checkout.save()

        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : rest.email,
            subject : "Order Placed Successfully 🎉",
            html : `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Thank You For Your Order 🎉</h2>
                    <p>
                        Hi ${rest.fname} ${rest.lname},
                    </p>
                    <p>
                        Your order has been placed successfully.
                    </p>
                    <h3>Order Details</h3>
                    ${rest.productName.map((item, index) => `
                        <div style="border:1px solid #ddd; padding:15px; margin-bottom:10px; border-radius:5px;">
                            <p>
                                <strong>Product :</strong> ${item}
                            </p>
                            <p>
                                <strong>Color :</strong> ${rest.productColor[index]}
                            </p>
                            <p>
                                <strong>Quantity :</strong> ${rest.productQuantity[index]}
                            </p>
                            <p>
                                <strong>Price :</strong> $${rest.productPrice[index]}
                            </p>
                        </div>
            `       ).join("")}
                    <h3>Total : $${rest.totalPrice}</h3>
                    <h3>Billing Details</h3>
                    <p>
                        ${rest.houseNumber},
                        ${rest.streetName},
                        ${rest.town},
                        ${rest.selectedState},
                        ${rest.selectedCountry}
                    </p>
                    <p>
                        Pincode : ${rest.pincode}
                    </p>
                    <p>
                        Phone : ${rest.number}
                    </p>
                    <p>
                        Payment Method : ${rest.payment}
                    </p>
                    <br/>
                    <p>
                        We will contact you once your order is shipped.
                    </p>
                    <img src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/logo-regular.png"
                    alt="Furniture Store Logo"  style="width: 180px; margin-top: 20px;" />
                </div>
            `
        })

        res.status(200).json({
            message : "Order Placed Successfully 🎉"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}