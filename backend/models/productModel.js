const mongoose = require("mongoose");

//Schema Creation
const productSchema = new mongoose.Schema(
  {
    _sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Seller",
      required: [true, "A product must have a seller"],
    },
    sellerName: {
      type: String,
      required: [true, "Please provide a seller name"],
    },
    sellerAccountType: {
      type: String,
    },
    productName: {
      type: String,
      required: [true, "Please provide a product name"],
    },

    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    productDetails: {
      type: String,
    },
    productCondition: {
      type: String,
    },
    startingBid: {
      type: String,
      required: [true, "Please enter a lowest bid amount"],
    },
    auctionDeadline: {
      type: String,
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
    allBids: [{ type: mongoose.Schema.ObjectId, ref: "Customer" }],
    upvotes: [{ type: mongoose.Schema.ObjectId, ref: "Customer" }],
    downvotes: [{ type: mongoose.Schema.ObjectId, ref: "Customer" }],
    maxBid: {
      type: String,
      default: "0",
    },
    photo: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate for appointments
productSchema.virtual("bids", {
  ref: "Bid",
  foreignField: "_productId",
  localField: "_id",
});

//Model Creation
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
