require("express-async-errors");
const express = require("express");
const app = express();

// DB Connection
const connectDB = require("./utils/connectDB");

// Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const filmMakerRoutes = require("./routes/filmmaker");
const artistRoutes = require("./routes/artist");

// Middlewares
const middlewares = require("./utils/middlewares");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Spotlighthub");
});
app.use(middlewares.extractToken);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/filmmaker", filmMakerRoutes);
app.use("/api/artist", artistRoutes);
app.use(middlewares.unknownEndpoints);
app.use(middlewares.errorHandler);

module.exports = app;
