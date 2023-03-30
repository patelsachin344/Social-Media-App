const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const connect = require("./db/connect");
const multer = require("multer");
const path = require("path");

mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

// mongoose.connect(process.env.DATABASEURL, () => {
//   console.log("Connecting to database");
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File successfullyn uploaded");
  } catch (error) {
    console.log(error);
  }
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

const Port = +process.env.PORT || 5000;

connect()
  .then(() => {
    app.listen(Port, () => {
      console.log(`listening on ${Port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
