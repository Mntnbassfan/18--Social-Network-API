const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // addFriend,
  // removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add and delete a friend
// router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
