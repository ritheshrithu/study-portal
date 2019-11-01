const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    empid: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model("User", UserSchema, "portal_users");
