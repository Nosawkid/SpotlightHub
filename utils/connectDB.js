const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connection = mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log("Mongo Connection Error: ", err);
  });

module.exports = connection;
