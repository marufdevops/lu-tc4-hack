const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Seller = require("../models/sellerModel");
const ApproveSeller = require("../models/approveSellerModel");
const Customer = require("../models/customerModel");
const ApproveCustomer = require("../models/approveCustomerModel");
const multermiddleware = require("../middlewares/multermiddleware");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync");

let refreshTokens = [];

//Sign Up An User
exports.signUser = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, phone, password, role } = req.body;

  //Hashing Password
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  //Check if the email is unique
  let newUser;

  if (!email || !firstName || !lastName || !password || !role) {
    return next(new AppError("provide the required fields", 400));
  }

  if (role === "seller") {
    if ((await (await Seller.find({ email: email })).length) == 0) {
      newUser = new Seller({
        firstName,
        lastName,
        phone,
        email,
        password: hash,
      });
    }
  } else if (role === "customer") {
    if ((await (await Customer.find({ email: email })).length) == 0) {
      newUser = new Customer({
        firstName,
        lastName,
        phone,
        email,
        password: hash,
      });
    }
  }

  //Logging in new User
  if (newUser) {
    const userId = {
      role,
      id: newUser._id,
      firstName,
    };
    const accessToken = generateToken(userId);
    const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
    refreshTokens.push(refreshToken);
    newUser.save();
    res.send({
      accessToken,
      refreshToken,
      role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});

//Logging in an user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new AppError("provide the required fields", 400));
  }
  //Check whether email matches
  let user;
  if (role === "customer" || role === "admin") {
    user = await Customer.find({ email: email });
  } else if (role === "seller") {
    user = await Seller.find({ email: email });
  }

  if (!user) {
    return next(new AppError("provide the valid informations", 404));
  }

  //Check whether password matches
  if (user && (await bcrypt.compare(password, user[0].password))) {
    const userId = {
      role,
      id: user[0]._id,
      firstName: user[0].firstName,
    };

    //Providing the user with a token
    const accessToken = generateToken(userId);
    const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
    refreshTokens.push(refreshToken);

    res.send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      role: role,
    });
  } else {
    return next(new AppError("provide the valid informations", 404));
  }
});

exports.loginPhone = catchAsync(async (req, res, next) => {
  const phone = req.body.phone;
  console.log(phone);
  let role;
  let user;
  // try {
  //   if (role === "customer" || role === "admin") {

  //   } else if (role === "seller") {
  //     user = await Seller.find({ phone: phone });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  user = await Customer.find({ phone: phone });
  role = "customer";
  if (!user) {
    user = await Seller.find({ phone: phone });
    role = "seller";
  }
  if (!user) {
    return next(new AppError("provide the valid informations", 404));
  }
  const userId = {
    role,
    id: user[0]._id,
    firstName: user[0].firstName,
  };

  //Providing the user with a token
  const accessToken = generateToken(userId);
  const refreshToken = jwt.sign(userId, process.env.REFRESHTOKEN);
  refreshTokens.push(refreshToken);

  res.send({
    accessToken: accessToken,
    refreshToken: refreshToken,
    role: role,
  });
});
//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY, { expiresIn: "60d" });
};

// //Multer middleware
// exports.uploadUserPhoto = multermiddleware.multerFunc("users-nid").single("photo");

// exports.verification = catchAsync(async (req, res, next) => {

//     const {nid,photo}=req.body

//     const approve = await Seller.findByIdAndUpdate(req.user.id, {
//         nid,

//       });
//       if (!approve) {
//         return next(new AppError("No approval document with that id", 404));
//       }

//       res.status(200).json({
//         message: "pending for approval",
//       });
//     });

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  let user;
  user = await Customer.findById(id);
  if (!user) {
    user = await Seller.findById(id);
  }
  res.send({
    user,
  });
});
