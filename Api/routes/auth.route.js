const User = require("../model/user.model");

const router = require("express").Router();
const bcrypt = require("bcrypt");

// register users

router.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hashpassword });
    delete password;
    res.status(200).send({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

  // try {
  //   const newUser = await new User({
  //     username: "sachinp",
  //     email: "sachinp@gmail.com",
  //     password: "password",
  //   });
  //  const user = await newUser.save();
  //   res.status.json(user);
  // } catch (error) {
  //   res.send(error.message);
  // }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const unhashpassword = await bcrypt.compare(password, user.password);
    if (!unhashpassword)
      return res.status(400).json({ message: "Password is incorrect" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
