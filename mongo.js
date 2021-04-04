const mongoose = require("mongoose");
const password = require("./password");

const connectionString = process.env.MONGO_DB_URI;

// connect to db

const rules = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(connectionString, rules)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.error(error);
  });
