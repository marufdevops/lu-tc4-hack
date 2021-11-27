const Seller = require("../models/sellerModel");
const catchAsync = require("../utils/catchAsync");

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
exports.getACustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.user.id);

  res.status(200).json({
    message: "successful",
    data: {
      customer,
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
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "phone",
    "password"
  );

  console.log(req.user);
  const updatedUser = await Seller.findByIdAndUpdate(
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
