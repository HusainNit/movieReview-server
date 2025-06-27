const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    name: { type: String },
    profileImg: { type: String },
    role: { type: String, default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favorites" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
