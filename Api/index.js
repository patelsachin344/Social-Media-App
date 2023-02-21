const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const usersRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

mongoose.connect(process.env.databaseUrl, () => {
  console.log("Connecting to database");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(8080, () => {
  console.log("listening on 8080");
});
