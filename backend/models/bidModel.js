const mongoose = require("mongoose");

//Schema Creation
const bidSchema = new mongoose.Schema(
  {
    _sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Seller",
      required: [true, "A product must have a seller"],
    },
    _productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Please provide a product name"],
    },
    _bidderId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: [true, "A  bid must have a customer"],
    },
    bid: {
      type: String,
      required: true,
    },
    allBids: [{ type: mongoose.Schema.ObjectId, ref: "Customer" }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Model Creation
const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
