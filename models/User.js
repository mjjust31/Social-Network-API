const mongoose = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create Student model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //validate the email
  },
  // thoughts: [thoughtSchema],
});

const User = mongoose.model("user", userSchema);
const handleError = (err) => console.error(err);

User.create({
  username: "ernie",
  email: "123@email.com",
})
  .then((result) => console.log("Created new document", result))
  .catch((err) => handleError(err));

module.exports = User;
