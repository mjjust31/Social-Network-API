const { User, Model } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  async createUser(req, res) {
    try {
      const result = await User.create(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  async findOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  async changeUser(req, res) {
    try {
      // Uses findOneAndUpdate() method on model
      const result = await User.findOneAndUpdate(
        { username: req.params.userId },
        { username: req.body.userId },
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  },

  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({
        username: req.params.userId,
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
  },

  async addFriend(req, res) {
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
        { $addToSet: { friends: req.params.friendId } },
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
  },

  async deleteFriend(req, res) {
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
  },
};
