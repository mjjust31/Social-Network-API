const express = require("express");
const db = require("./config/connection");
const { User, Thought, Reaction } = require("./models");

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
app.get("/users/:userId", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.userId });
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
      { username: req.params.username },
      { username: req.body.username },
      { new: true }
    );
    res.status(200).json(result);
    console.log(`Updated: ${result}`);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

//delete user
app.delete("/users/:username", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({
      username: req.params.username,
    });

    // let thoughtResult;

    // if (result) {
    //   const thoughtResult = await Thought.deleteMany({
    //     username: result._id,
    //   });
    // }

    res.status(200).json(
      // { user:
      result
      // , thought: thoughtResult }
    );
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

//get all thoughts
app.get("/thoughts", async (req, res) => {
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get one thought

app.get("/thoughts/:_id", async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params._id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/thoughts", async (req, res) => {
  try {
    const result = await Thought.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//update thought

app.put("/thoughts/:_id", async (req, res) => {
  try {
    const result = await Thought.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        thoughtText: req.body.thoughtText,
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log("Wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

//delete thought

app.delete("/thoughts/:_id", async (req, res) => {
  try {
    const result = await Thought.findByIdAndDelete({
      _id: req.params._id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Not correct" });
  }
});

//add friend: /users/:userId/friends/:friendsId


//delete friend /users/:userId/friends/:friendsId




//add reaction thoughts/thoughtId/reactions

app.post('')


//deation reaction thoughts/thoughtId/reactions/reactionsId



db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
