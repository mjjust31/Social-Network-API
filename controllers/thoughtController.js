const { Thought, Model } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const result = await Thought.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createThought(req, res) {
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
  },

  async getOneThought(req, res) {
    try {
      const result = await Thought.findOne({ _id: req.params._id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  async updateThought(req, res) {
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
  },

  async deleteThought(req, res) {
    try {
      const result = await Thought.findByIdAndDelete({
        _id: req.params._id,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Not correct" });
    }
  },

  async createReaction(req, res) {
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
  },
  async deleteReaction(req, res) {
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
  },
};
