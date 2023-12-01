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
    //validate the email
  },
  thoughtText: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("user", userSchema);
// const handleError = (err) => console.error(err);

// User.create(
//   {
//     username: "ernie",
//     email: "123@email.com",
//     friends: ["6568e01f0c3dc4c4cb8ad8d1", "6568e01f0c3dc4c4cb8ad8d2"],
  
//   },

//   {
//     username: "jmj",
//     email: "1234@email.com",
//     friends: ["6568d93a96ab4d10948e8f53", "6568e01f0c3dc4c4cb8ad8d2"],

//   },
//   {
//     username: "bob",
//     email: "abc@email.com",
//     friends: "6568d93a96ab4d10948e8f53",

//   }
// )
//   .then((result) => console.log("Created new document", result))
//   .catch((err) => handleError(err));

module.exports = User;
