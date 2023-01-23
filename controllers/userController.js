const { ObjectId } = require("mongoose").Types;
const { User, thought } = require("../models");

// Aggregate function to get the number of Users overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        // const userObj = {
        //   users,
        //   headCount: await headCount(),
        // };

        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a singleUser
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "NoUser with that ID" })
          : res.json(
            user
          )
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a newUser
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req,res) {
User.findOneAndUpdate({_id:req.params.userId},{$set:req.body},{runValidators:true,new:true})
.then((user) => res.json(user))
.catch((err) => res.status(500).json(err));
}
,
  // Delete a User and remove them from the thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
     
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "user deleted, but no thoughts found",
            })
          : res.json({ message: "user successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to aUser
  addFriend(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID : " })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a User
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:  req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));

  },
};
