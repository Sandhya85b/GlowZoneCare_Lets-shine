const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
