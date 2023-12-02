const router = require("express").Router();
const { User, Thought } = require("../../models");

//Get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//find one user
router.get("/:userId", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.userId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//change User
router.put("/:username", async (req, res) => {
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
router.delete("/:username", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({
      username: req.params.username,
    });

    let thoughtResult; // Declare thoughtResult here

    if (result) {
      thoughtResult = await Thought.deleteMany({
        username: result._id,
      });
    }

    res.status(200).json({
      user: result,
      thought: thoughtResult,
    });

    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ message: "something went wrong" });
  }
});

//add friend: /users/:userId/friends/:friendsId

router.post("/:userId/friends/:friendId", async (req, res) => {
  console.log("yay you hit the friend route");
  console.log(req.body);
  try {
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res
        .status(404)
        .json({ message: "this user does not exist to be freinds with!" });
    }

    const result = await User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      { $addToSet: { friends: req.params.friendsId } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete friend /users/:userId/friends/:friendsId

router.delete("/:userId/friends/:friendId", async (req, res) => {
  console.log("delete your friend route");
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId } } },
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "No result found with that ID :(" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
