const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const Bid = require("../models/bidModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllCustomer = catchAsync(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json({
    message: "successful",
    No_of_Customers: customers.length,
    data: {
      customers,
    },
  });
});

//Find A single Customer
exports.getACustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.user.id).populate({
    path: "bids",
    select: "bid _productId _sellerId",
  });

  res.status(200).json({
    message: "successful",
    data: {
      customer,
    },
  });
});

//update customer info
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateProfileInfo = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "phone",
    "password"
  );

  console.log(req.user);
  const updatedUser = await Customer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.bidAProduct = catchAsync(async (req, res, next) => {
  // const productId = req.params.id;
  // const userId = req.user.id;
  const product = await Product.findById(req.params.id);
  const isBid = product.allBids && product.allBids.includes(req.user.id);

  let option;
  if (!isBid) {
    option = "$addToSet";
  } else {
    return next(new AppError("You've already bid on this product", 400));
  }
  await Product.findByIdAndUpdate(
    product._id,
    {
      [option]: { allBids: req.user.id },
    },
    { new: true }
  );

  const newBid = Bid.create({
    _sellerId: product._sellerId,
    _bidderId: req.user.id,
    _productId: product._id,
    bid: req.body.bid,
  });
  res.status(201).json({
    message: "success",
    data: {
      newBid,
    },
  });
});
