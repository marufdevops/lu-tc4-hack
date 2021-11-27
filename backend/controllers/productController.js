const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const Seller = require("../models/sellerModel");
const AppError = require("../utils/AppError");
const schedule = require("node-schedule");

schedule.scheduleJob("0 0 1 * *", async () => {
  await Seller.updateMany(
    { accountType: "free" },
    {
      $set: { max: 0 },
    }
  );
  console.log("new month");
});

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
  const upvotes_length = product.upvotes.length;
  const downvotes_length = product.downvotes.length;

  const total = upvotes_length * 3 - downvotes_length * 3;

  const seller = await Seller.findByIdAndUpdate(product._sellerId, {
    $set: { selling_points: total },
  });

  res.status(200).json({
    message: "successful",
    data: {
      product,
      seller,
    },
  });
});

//Create a new product
exports.createAProduct = catchAsync(async (req, res, next) => {
  const seller = await Seller.findById(req.user.id);
  if (seller.accountType === "free") {
    if (seller.max >= 10) {
      return next(
        new AppError("you have exceeded your limit for this month", 400)
      );
    }
  }

  const curMax = seller.max + 1;
  const sellerx = await Seller.findByIdAndUpdate(req.user.id, {
    $set: { max: curMax },
  });

  const newProduct = await Product.create({
    ...req.body,
    _sellerId: req.user.id,
    sellerAccountType: seller.accountType,
    photo: req.file ? req.file.filename : "productDefault.jpg",
  });
  res.status(201).json({
    message: "successful",
    data: {
      newProduct,
    },
  });
});

exports.upvoteAProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.id;

  const user = await Customer.findById(userId);
  const isUpvoted = user.upvotes && user.upvotes.includes(productId);
  const isDownvoted = user.downvotes && user.downvotes.includes(productId);

  let option;
  if (!isUpvoted) {
    option = "$addToSet";
  } else option = "$pull";
  let userx = await Customer.findByIdAndUpdate(
    userId,
    {
      [option]: { upvotes: productId },
    },
    { new: true }
  );
  let product = await Product.findByIdAndUpdate(
    productId,
    {
      [option]: { upvotes: userId },
    },

    { new: true }
  );

  if (isDownvoted) {
    userx = await Customer.findByIdAndUpdate(
      userId,
      {
        $pull: { downvotes: productId },
      },
      { new: true }
    );
    product = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { downvotes: userId },
      },

      { new: true }
    );
  }

  res.status(200).json({
    message: "successful",
    data: {
      product,
      user: userx,
    },
  });
});

exports.downvoteAPost = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  const user = await Customer.findById(userId);

  const isDownvoted = user.downvotes && user.downvotes.includes(productId);
  const isUpvoted = user.upvotes && user.upvotes.includes(productId);
  let option;
  if (!isDownvoted) {
    option = "$addToSet";
  } else option = "$pull";
  let userx = await Customer.findByIdAndUpdate(
    userId,
    {
      [option]: { downvotes: productId },
    },
    { new: true }
  );
  let product = await Product.findByIdAndUpdate(
    productId,
    {
      [option]: { downvotes: userId },
    },
    { new: true }
  );
  if (isUpvoted) {
    userx = await Customer.findByIdAndUpdate(
      userId,
      {
        $pull: { upvotes: productId },
      },
      { new: true }
    );
    product = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { upvotes: userId },
      },

      { new: true }
    );
  }
  res.status(200).json({
    message: "successful",
    data: {
      product,
      user: userx,
    },
  });
});
