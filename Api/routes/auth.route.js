const User = require("../model/user.model");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const genrateToken = (user) => {
  if (user.password) {
    delete user.password;
  }
  const token = jwt.sign(user, process.env.SECURITY_KEY);
  return token;
};

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const unhashpassword = await bcrypt.compare(password, user.password);
    if (!unhashpassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    console.log(user);
    const token = genrateToken(user.toJSON());
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logedin", async (req, res) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECURITY_KEY);
      console.log(user);
      res.send({ user });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else {
    res.json("Please Provide a Authorization for login");
  }
});

module.exports = router;
