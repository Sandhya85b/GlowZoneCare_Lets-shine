const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

router.post("/add", async (req, res) => {
    try {
        const { productId } = req.body;
        const existingItem = await Wishlist.findOne({ productId });
        if (existingItem) return res.status(400).json({ message: "Already in wishlist" });

        const wishlistItem = new Wishlist({ productId });
        await wishlistItem.save();
        res.status(201).json({ message: "Added to wishlist" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const wishlist = await Wishlist.find().populate("productId");
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from wishlist" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
