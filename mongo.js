const mongoose = require("mongoose");
const password = require("./password");

const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env;

const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

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
