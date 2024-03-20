const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bhatia4404:shivam%40123@mycluster.lhp4hzu.mongodb.net/"
);

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});
const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);
module.exports = { User, Account };
