const express = require("express");
const userRouter = require("./user.routers");
const rootRouter = express.Router();

// rootRouter.use("/users", userRouter);
userRouter.get("/", getAllUsers);
userRouter.post("/register", registerUser);

module.exports = {
  rootRouter,
};
