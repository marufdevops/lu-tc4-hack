const mongoose = require("mongoose");

//Schema Creation
const customerSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    photo: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Model Creation
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
