const router = require("express").Router();
const { User, Thought } = require("../../models");
const {
  getAllUsers,
  createUser,
  findOneUser,
  changeUser,
  deleteUser,
} = require("../../controllers/userControllers");

//home routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(findOneUser).put(changeUser).delete(deleteUser);


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
