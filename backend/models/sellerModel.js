const mongoose = require("mongoose");

//Schema Creation
const sellerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a email"],
    },
    role: {
      type: String,
      default: "seller",
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone no."],
    },
    nid: String,
    nid_images: [String],
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    accountType: {
      type: String,
      default: "free",
    },
    photo: String,
    selling_points: {
      type: Number,
      default: 0,
    },
    confirmed:{
      type: Boolean,
      default: 0,
    },
    approved: {
      type: Boolean,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate for appointments
sellerSchema.virtual("products", {
  ref: "Product",
  foreignField: "_sellerId",
  localField: "_id",
});
//Model Creation
const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
