const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.post("/add", async (req, res) => {
    try {
        const { productId } = req.body;
        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = new Cart({ productId, quantity: 1 });
        }

        await cartItem.save();
        res.status(201).json({ message: "Added to cart" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const cart = await Cart.find().populate("productId");
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { quantity } = req.body;
        await Cart.findByIdAndUpdate(req.params.id, { quantity });
        res.json({ message: "Cart updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from cart" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
