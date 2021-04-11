const notesRouter = require("express").Router();
const Note = require("../models/Note");
const User = require("../models/User");
const userExtractor = require("../middleware/userExtractor");

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

notesRouter.put("/:id", userExtractor, async (request, response, next) => {
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

notesRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const notesRemoved = await Note.findByIdAndRemove(id);
    response.json(notesRemoved).status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", userExtractor, async (request, response, next) => {
  const {content, important = false} = request.body;
  const {userId} = request;
  const user = await User.findById(userId);

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id,
  });

  try {
    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
