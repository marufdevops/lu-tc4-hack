const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const approvalRouter = require("./routes/approvalRoutes");
const productRouter = require("./routes/productRoutes");
const adminRouter = require("./routes/adminRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
app.use(express.static("img/products"));

// Cross-Origin Resource Sharing middleware
// app.use(
//   cors('*')
// );
// app.use(cors(), function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

//REST Architecture
app.use("/api/users", userRouter);
app.use("/api/approvals", approvalRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);

//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
