const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
<<<<<<< HEAD
const approvalRouter = require("./routes/approvalRoutes");
=======
const productRouter = require("./routes/productRoutes")
>>>>>>> f45e5e184a870f8d0eea297337fea93d91091018
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

// Cross-Origin Resource Sharing middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

//REST Architecture
app.use("/api/users", userRouter);
<<<<<<< HEAD
app.use("/api/approvals", approvalRouter);
=======
app.use("/api/products", productRouter);
>>>>>>> f45e5e184a870f8d0eea297337fea93d91091018

//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
