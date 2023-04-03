const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

// updata the user credentials

router.put("/:id", async (req, res) => {
  console.log(req.params.id, req.body.userId);
  if (req.params.id === req.body.userId || req.body.admin) {
    // if (req.body.password) {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     const hashpassword = await bcrypt.hash(req.body.password, salt);
    //     req.body.password = hashpassword;
    //   } catch (error) {
    //     res.status(500).json({ error: error.message });
    //   }
    // }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).send({ message: "You can change only your credentials" });
  }
});

// delete the user

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId || req.body.admin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashpassword;
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    try {
      await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been deleted");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).send({ message: "You can delete only your account" });
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
// getAll users
router.get("/allUsers/:userId", async (req, res) => {
  try {
    const users = await User.find({ _id: { $nin: [req.params.userId] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get followings users
router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    const friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// follow the  user
router.put("/:id/follow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });

        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });

        res.status(200).json("User has been followed");
      } else {
        res.status(404).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow or unfollow yourself");
  }
});

// unfollow the user

router.put("/:id/unfollow", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });

        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });

        res.status(200).json("User has been unfollowed");
      } else {
        res.status(404).json("You are not following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow or unfollow yourself");
  }
});

module.exports = router;
