const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/api/users", async (request, response) => {
  const {body} = request;
  const {userName, name, password} = body;

  const user = new User({
    userName,
    name,
    passwordHash: password,
  });

  const saveUser = await user.save();
  response.json(saveUser);
});

module.exports = usersRouter;
