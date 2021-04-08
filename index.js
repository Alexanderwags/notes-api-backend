const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./mongo");

app.use(cors());
app.use(express.json());

const Note = require("./models/Note.js");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {app, server};
