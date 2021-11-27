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

//Get All the products
exports.getAProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "bids",
    select: "bid _bidderId",
  });
  res.status(200).json({
    message: "successful",
    data: {
      product,
    },
  });
});

//Create a new product
exports.createAProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    ...req.body,
    _sellerId: req.user.id,
    photo: req.file ? req.file.filename : "productDefault.png",
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
