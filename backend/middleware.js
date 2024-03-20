const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { User } = require("./db");
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Wrong token",
    });
  }
}
module.exports = { authMiddleware };
