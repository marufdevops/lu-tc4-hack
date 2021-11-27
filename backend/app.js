const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

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

module.exports = app;
