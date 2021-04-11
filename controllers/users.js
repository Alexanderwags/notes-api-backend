const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    date: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const {body} = request;
  const {userName, name, password} = body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    userName,
    name,
    passwordHash,
  });

  const saveUser = await user.save();
  response.json(saveUser);
});

module.exports = usersRouter;
