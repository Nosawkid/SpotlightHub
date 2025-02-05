const authRoute = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const argon2 = require("argon2");

authRoute.post("/authenticate", async (req, res) => {
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password cannot be blank" });
  }
  const user = await User.findOne({
    $or: [{ username: loginId }, { email: loginId }],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isPassword = await argon2.verify(user.passwordHash, password);
  if (!isPassword) {
    return res.status(401).json({ error: "Invalid Password" });
  }
  const userToken = {
    username: user.username,
    id: user._id,
    role: user.role,
  };
  const token = jwt.sign(userToken, process.env.SECRET, {
    expiresIn: "24h",
  });
  res
    .status(200)
    .send({ token, id: user._id, username: user.username, role: user.role });
});

module.exports = authRoute;
