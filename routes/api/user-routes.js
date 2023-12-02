const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  findOneUser,
  changeUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(findOneUser).put(changeUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
