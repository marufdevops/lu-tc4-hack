const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");


//Get All the products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    message: "successful",
    No_of_products: products.length,
    data: {
      products,
    },
  });
});


//Create a new product
exports.createAProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    ...req.body,
    _sellerId: req.user.id,
  });
  res.status(201).json({
    message: "successful",
    data: {
      newProduct,
    },
  });
});


//Cancel an auction
exports.cancelAnAuction = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "successfully canceled",
  });
});