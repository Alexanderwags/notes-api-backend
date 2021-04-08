const notesRouter = require("express").Router();
const Note = require("../models/Note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const notesFind = await Note.findById(id);
    if (notesFind) {
      return response.json(notesFind);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const note = request.body;

    const newNoteInfo = {
      content: note.content,
      important: note.important,
    };
    const notesUpdate = await Note.findByIdAndUpdate(id, newNoteInfo, {
      new: true,
    });

    response.json(notesUpdate);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const notesRemoved = await Note.findByIdAndRemove(id);
    response.json(notesRemoved).status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (request, response, next) => {
  try {
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

    const createNote = await newNote.save();
    response.json(createNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
