const { User, Thought } = require("../models");

module.exports = {
  //works
  async getAllUsers(req, res) {
    try {
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //works
  async createUser(req, res) {
    try {
      const result = await User.create(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //works
  async findOneUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //works
  async changeUser(req, res) {
    try {
      const update = {};
      if (req.body.username) {
        update.username = req.body.username;
      }
      if (req.body.email) {
        update.email = req.body.email;
      }

      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        update,
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  },

  //works
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      res.status(200).json(result);

      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ message: "something went wrong" });
    }
  },

  // works
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
        { $addToSet: { friends: {_id: friend._id} } },
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
//working
  async deleteFriend(req, res) {
    console.log("hit delete route");
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { _id: req.params.friendId } } },
        { new: true }
      );

      console.log(result);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
