const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = Router();
accountRouter.get("/balance", authMiddleware, async function (req, res) {
  const { userId } = req;
  const existingAccount = await Account.findOne({
    userId,
  });
  res.json({
    balance: existingAccount.balance,
  });
});
accountRouter.post("/transfer", authMiddleware, async function (req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  const fromAccount = await Account.findOne({
    userId: req.userId,
  });
  if (!fromAccount || fromAccount.balance < amount) {
    session.abortTransaction();
    res.status(400).json({
      message: "Insufficient balance",
    });
    return;
  }
  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    session.abortTransaction();
    res.status(400).json({
      message: "Invalid account",
    });
    return;
  }

  //
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );
  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer successfull",
  });
});

module.exports = accountRouter;
