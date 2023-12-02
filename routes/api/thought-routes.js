const router = require("express").Router();
const { User, Thought } = require("../../models");

//get all thoughts
router.get("/", async (req, res) => {
  console.log("you hit this route");
  try {
    // Using model in route to find all documents that are instances of that model
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Thought.create(req.body);

    const userArray = await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      { $push: { thoughtText: result._id } },
      { new: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//get one thought

router.get("/:_id", async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params._id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});



//update thought

router.put("/:_id", async (req, res) => {
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

router.delete("/:_id", async (req, res) => {
  try {
    const result = await Thought.findByIdAndDelete({
      _id: req.params._id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Not correct" });
  }
});

//add reaction thoughts/thoughtId/reactions

router.post("/:_id/reactions", async (req, res) => {
  console.log("You hit this route");
  console.log(req.body);
  try {
    // const reaction = await Reaction.create(req.body); you are not exporting the model to be used in a reaction
    const result = await Thought.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!result) {
      res
        .status(404)
        .json({ message: "No thought found with this id to make comment" });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

//deation reaction thoughts/thoughtId/reactions/reactionsId
router.delete("/:thoughtId/reactions/:reactionsId", async (req, res) => {
  console.log("hit this route");
  try {
    const result = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionsId } } },
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
