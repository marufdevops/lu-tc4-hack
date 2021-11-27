const Seller = require("../models/sellerModel");

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
