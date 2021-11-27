const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

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
  const customer = await Customer.findById(req.user.id);

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
  console.log(req.body);
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

// exports.bidAProduct = catchAsync(async (req, res, next) => {
//   const productId = req.params.id;
//   const userId = req.user.id;
//   const product = await Product.findById(productId);
//   const isBid = product.bids && product.bids.includes(userId);

//   let option;
//   if (!isBid) {
//     option = "$addToSet";
//   } else {
//     return next(new AppError("You've already bid on this product", 400));
//   }
//   let pro = await Product.findByIdAndUpdate(
//     productId,
//     {
//       [option]: { bids: userId },
//     },
//     { new: true }
//   );

//   res.status(201).json({
//     message: "success",
//     data: {
//       pro,
//     },
//   });
// });
