const filmMakerRoutes = require("express").Router();
const Project = require("../models/project");
const User = require("../models/user");
const { userExtractor } = require("../utils/middlewares");

// Create Project
filmMakerRoutes.post("/project", userExtractor, async (req, res) => {
  const user = req.user;
  const { title, description, professions } = req.body;
  let project = new Project({
    title,
    description,
    professions,
    postedBy: user.id,
  });
  project = await project.save();
  res.status(201).json({
    message: "Project Creation Success",
    data: project,
  });
});

// View Filmmaker Specific Projects
filmMakerRoutes.get("/project", userExtractor, async (req, res) => {
  const projects = await Project.find({ postedBy: req.user.id });
  res.status(200).json(projects);
});

module.exports = filmMakerRoutes;
