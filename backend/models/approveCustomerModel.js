const mongoose = require("mongoose");

//Schema Creation
const approveCustomerSchema = new mongoose.Schema(
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
      default: "customer",
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
    photo: String,
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

//Model Creation
const ApproveCustomer = mongoose.model(
  "ApproveCustomer",
  approveCustomerSchema
);

module.exports = ApproveCustomer;
