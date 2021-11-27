const mongoose = require("mongoose");

//Schema Creation
const productSchema = new mongoose.Schema(
  {
    _sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Seller",
      required: [true, "A product must have a seller"],
    },
    productName: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    startingBid: {
      type: String,
      required: [true, "Please enter a lowest bid amount"],
    },
    auctionDeadline: {
      type: Date,
      required: [true, "Please provide a deadline for the auction"],
    },

    winningCriteria: {
      type: String,
      default: "automatic",
    },
    winningCondition: {
      type: String,
      default: "highestBidder",
    },
    photos: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Model Creation
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
