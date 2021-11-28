const Seller = require("../models/sellerModel");
const catchAsync = require("../utils/catchAsync");
const multermiddleware = require("../middlewares/multermiddleware");
const Product = require("../models/productModel");
const fs = require("fs");

//Find All Sellers
exports.getAllSellers = async (req, res, next) => {
  const sellers = await Seller.find();
  res.status(200).json({
    message: "successful",
    No_of_sellers: sellers.length,
    data: {
      sellers,
    },
  });
};

//Find A single Customer
exports.getASeller = catchAsync(async (req, res, next) => {
  const seller = await Seller.findById(req.user.id).populate({
    path: "products",
    select: "productName startingBid",
  });

  res.status(200).json({
    message: "successful",
    data: {
      seller,
    },
  });
});

//update seller info
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateProfileInfo = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  // let base64Image = req.body.nidFront.split(";base64,").pop();
  // fs.writeFile(
  //   `./img/nid/${req.user.id}.jpg`,
  //   base64Image,
  //   "base64",
  //   function (err) {
  //     console.log(err);
  //   }
  // );
  // const filteredBody = filterObj(
  //   req.body,
  //   photo:`nid-${req.user.id}.jpg`,
  //   "firstName",
  //   "lastName",
  //   "phone",
  //   "password"
  // );
  // const update = await Seller.findByIdAndUpdate(req.user.id, {
  //   photo: `nid-${req.user.id}.jpg`,
  //   nid: req.body.nid
  // })
  // const updatedUser = await Seller.findByIdAndUpdate(
  //   req.user.id,
  //   filteredBody,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );
  const updatedUser = await Seller.findByIdAndUpdate(req.user.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.upgradeToPremium = catchAsync(async (req, res, next) => {
  await Seller.findByIdAndUpdate(req.user.id, {
    $set: { accountType: "premium" },
  });
  res.status(200).json({
    status: "upgraded to premium",
  });
});

exports.featuredSellers = catchAsync(async (req, res, next) => {
  //data aggregation for featured products
  const featured = await Product.aggregate([
    {
      $match: { sellerAccountType: "premium" },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      featured,
    },
  });
});
