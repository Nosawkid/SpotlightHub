const userRoutes = require("express").Router();
const argon2 = require("argon2");
const User = require("../models/user");
const { userExtractor } = require("../utils/middlewares");

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

userRoutes.put("/profile", userExtractor, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update only the fields provided in the request body
    const { username, profilePicture, bio, profession, workHistory } = req.body;

    if (username) user.username = username;
    if (profilePicture) user.profilePicture = profilePicture;
    if (bio) user.bio = bio;
    if (profession) user.profession = profession;
    if (workHistory) user.workHistory = workHistory;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userRoutes;
