const express = require("express");
const db = require("./config/connection");
const { User } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//find one user
app.get("/users/:username", async (req, res) => {
  try {
    const result = await User.findOne({ username: req.params.username });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add User
app.post("/users", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//change User
app.put("/users/:username", async (req, res) => {
  try {
    // Uses findOneAndUpdate() method on model
    const result = await User.findOneAndUpdate(
      { username: req.body.username },
      { username: req.params.username },
      { new: true }
    );
    res.status(200).json(result);
    console.log(`Updated: ${result}`);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

app.delete("/users/:username", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({
      username: req.params.username,
    });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

//delete user
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
