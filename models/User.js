const mongoose = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create Student model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  thoughtText: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    },
  ],
  friends: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User = mongoose.model("user", userSchema);

module.exports = User;
