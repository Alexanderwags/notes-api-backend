const mongoose = require("mongoose");
const password = require("./password");
const {Schema, model} = mongoose;
const connectionString = `mongodb+srv://db_william:${password}@cluster0.z7ilb.mongodb.net/notes?retryWrites=true&w=majority`;

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

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = model("Note", noteSchema);

const note = new Note({
  content: "MongoDB is incredible , william_ws7",
  date: new Date(),
  important: true,
});
