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
mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

// mongoose.connect(process.env.DATABASEURL, () => {
//   console.log("Connecting to database");
// });
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

connect()
  .then(() => {
    app.listen(8080, () => {
      console.log("listening on 8080");
    });
  })
  .catch((err) => {
    console.error(err);
  });
