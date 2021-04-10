const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
