const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const approvalRouter = require("./routes/approvalRoutes");
const productRouter = require("./routes/productRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
app.use(express.static("img/products"));

app.use(cors());
app.options('*', cors());

//REST Architecture
app.use("/api/users", userRouter);
app.use("/api/approvals", approvalRouter);
app.use("/api/products", productRouter);

//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
