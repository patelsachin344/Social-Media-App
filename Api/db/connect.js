const mongoose = require("mongoose");

const connect = async () => {
  return new Promise((res, rej) => {
    mongoose.connect(process.env.DATABASEURL, (err) => {
      if (err) {
        console.error(err);
        rej();
      }
      console.log("Connected to database ");
      res();
    });
  });
};

module.exports = connect;
