const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    username: { type: "string", required: true, min: 3, max: 20, unique: true },
    email: { type: "string", required: true, max: 50, unique: true },
    password: { type: "string", required: true, min: 6 },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    admin: { type: Boolean, default: false },
    desc: { type: String, max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userShema);
module.exports = User;
