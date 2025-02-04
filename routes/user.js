const userRoutes = require("express").Router();
const argon2 = require("argon2");
const User = require("../models/user");

// Register User
userRoutes.post("/register", async (req, res) => {
  const { username, email, password, role, profilePicture, bio, profession } =
    req.body;

  if (!password) {
    return res.status(400).json({ error: "Password Cannot be empty" });
  }

  const passwordHash = await argon2.hash(password);
  let user = new User({
    username,
    email,
    passwordHash,
    role,
    profilePicture,
    bio,
    profession,
  });

  user = await user.save();
  res.status(201).json({
    message: "User Creation success",
    data: user,
  });
});

module.exports = userRoutes;
