const Post = require("../model/post.model");
const User = require("../model/user.model");

const router = require("express").Router();

// create post

router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    // const postData = await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne(req.body);
      res.status(200).json("Post updated successfully");
    } else {
      res.status(403).json("You can update only  your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(404).json("You can delete only  your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get perticuller users posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // console.log(user);

    // const posts = await Post.find({ userId: user._id });
    const posts = await Post.find({ userId: user._id }).populate("userId");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// like or dislike posts

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked successfully");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post disliked successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// timeline
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).populate(
      "userId"
    );
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendsId) => {
        return Post.find({ userId: friendsId }).populate("userId");
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
