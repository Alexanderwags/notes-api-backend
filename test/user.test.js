const bcrypt = require("bcrypt");
const User = require("../models/User");

describe("creating a new user", () => {
  beforeEach(async () => {
    await User.deleteMany();

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({userName: "williamRoot", passwordHash});

    await user.save();
  });

  test("works as expected creating a fresh username", async () => {
    const userDB = await User.find({});
    const usersAtStart = usersDB.map((user) => user.toJSON());

    const newUser = {
      userName: "william",
      name: "william",
      password: "william",
    };

    await api;
  });
});
