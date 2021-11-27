const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel")

let refreshTokens = [];

//Sign Up An User
exports.signUser = async (req, res, next) => {
  const { email, firstName, lastName, phone, password, role } = req.body;

  //Hashing Password
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  //Check if the email is unique
  let newUser;

  //   if (!email || !fullname || !password || !role) {
  //     return next(new AppError("provide the required fields", 400));
  //   }

  //   if (role === "professional") {
  //     if ((await (await Professional.find({ email: email })).length) == 0) {
  //       //if the role is professional it first needs to be approved
  //       const { edu, degrees, work, research, achievment, specialization } =
  //         req.body;
  //       newUser = new ApproveProfessional({
  //         fullname,
  //         email,
  //         password: hash,
  //         Education_qualifications: edu,
  //         Degrees: degrees,
  //         Specialization: [...specialization],
  //         Work_experience: work,
  //         Research_and_Publications: research,
  //         Achievements: achievment,
  //         photo: "professionalDefault.png",
  //       });
  //     }
  // }
  if ((await (await Seller.find({ email: email })).length) == 0) {
    newUser = new Seller({
      firstName,
      lastName,
      phone,
      email,
      password: hash,
    });
  }

  if ((await (await Customer.find({ email: email })).length) == 0) {
    newUser = new Customer({
      firstName,
      lastName,
      phone,
      email,
      password: hash,
    });
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
    // return next(new AppError("provide the valid informations", 404));
  }
};

//Logging in an user
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;

  // if (!email || !password || !role) {
  //   return next(new AppError("provide the required fields", 400));
  // }
  //Check whether email matches
  let user;
  if (role === "customer" || role === "admin") {
    user = await Customer.find({ email: email });
  } else if (role === "seller") {
    user = await Seller.find({ email: email });
  }

  // if (!user) {
  //   return next(new AppError("provide the valid informations", 404));
  // }

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
  }
  // else {
  //   return next(new AppError("provide the valid informations", 404));
  // }
};

//Token Creation
const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESSKEY, { expiresIn: "60d" });
};
