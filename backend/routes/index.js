const { Router } = require("express");
const { userRouter } = require("./user");
const accountRouter = require("./account");
const rootRouter = Router();
rootRouter.use("/account", accountRouter);
rootRouter.use("/user", userRouter);
module.exports = rootRouter;
