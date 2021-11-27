const ApproveCustomer = require("../models/approveCustomerModel");
const ApproveSeller = require("../models/approveSellerModel");
const Seller = require("../models/sellerModel");
const catchAsync = require("../utils/catchAsync");

//See all pending approvals for sellers
exports.pendingSellerApprovals = catchAsync(async (req, res) => {
  const approvals = await ApproveSeller.find();
  res.status(200).json({
    message: "success",
    data: {
      approvals,
    },
  });
});

// //Approve a seller
// exports.approveASeller = catchAsync(async (req, res) => {
//   const approve = await ApproveSeller.findById(req.params.id);

//   if (!approve) {
//     return next(new AppError("No approval found with that ID", 404));
//   }

//   const email = approve.email;
//   await Seller.findOneAndUpdate(
//     { email: email },
//     {
//       approved: "true",
//     }
//   );
//   console.log(approve);
//   //await ApproveSeller.deleteOne(approve._id);
//   res.status(200).json({
//     message: "approved",
//   });
// });

//See all pending approvals for customers
exports.pendingCustomerApprovals = catchAsync(async (req, res) => {
  const approvals = await ApproveCustomer.find();
  res.status(200).json({
    message: "success",
    data: {
      approvals,
    },
  });
});
