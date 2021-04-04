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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((note) => {
    response.json(note);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        return response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const note = request.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNoteInfo, {new: true}).then((result) => {
    response.json(result);
  });
});

app.delete("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;

  Note.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;

  if (!note.content) {
    return response.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false,
  });

  newNote.save().then((saveNote) => {
    response.json(saveNote);
  });
});

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
