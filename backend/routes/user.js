const { Router } = require("express");
const zod = require("zod");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const signUpSchema = zod.object({
  firstName: zod.string({
    required_error: "First Name is a required field.",
  }),
  lastName: zod.string({
    required_error: "Last Name is a required field.",
  }),
  username: zod
    .string({
      required_error: "Username is a required field.",
    })
    .email(),
  password: zod
    .string({
      required_error: "Password is a required field",
    })
    .min(8),
});
const signinSchema = zod.object({
  username: zod
    .string({
      required_error: "Username is a required field.",
    })
    .email({
      message: "Invalid email",
    }),
  password: zod
    .string({
      required_error: "Password is a required field.",
    })
    .min(8, {
      message: "Password should have atleast 8 characters.",
    }),
});
userRouter.post("/signup", async function (req, res) {
  const { body } = req;
  const parsed = signUpSchema.safeParse(body);
  const existing = await User.findOne({
    username: body.username,
  });
  if (!parsed.success || existing) {
    res.status(411).json({
      errors: parsed.issues,
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }
  const newUser = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const userId = newUser._id;
  await Account.create({
    userId: userId,
    balance: 1 + Number((Math.random() * 10000).toFixed(2)),
  });
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token,
  });
});
//
userRouter.post("/signin", async function (req, res) {
  const { body } = req;
  const parsed = signinSchema.safeParse(body);
  const existing = await User.findOne({
    username: body.username,
  });
  if (!parsed.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  if (!existing) {
    res.status(411).json({
      message: "Error while logging in",
    });
    return;
  }
  const userId = existing._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    token,
  });
});
///
const updateBodySchema = zod.object({
  password: zod.string().min(8).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
userRouter.put("/", authMiddleware, async function (req, res) {
  const { body: updations } = req;
  const parsedBody = updateBodySchema.safeParse(updations);
  if (!parsedBody.success) {
    res.status(411).json({
      message: "Error while updating information",
    });
    return;
  }
  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.status(200).json({
    message: "Updated successfully",
  });
});
userRouter.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";
  const allUsers = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.status(200).json({
    users: allUsers,
  });
});
userRouter.get("/find", async function (req, res) {
  const { token } = req.query;

  const { userId } = jwt.decode(token);

  const user = await User.findOne({
    _id: userId,
  });
  const { balance } = await Account.findOne({
    userId,
  });

  res.status(200).json({ user, balance });
});
//////
module.exports = { userRouter };
