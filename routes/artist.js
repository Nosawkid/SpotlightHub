const artistRoutes = require("express").Router();
const Project = require("../models/project");
const User = require("../models/user");
const { userExtractor } = require("../utils/middlewares");

// Apply for projects
artistRoutes.put("/project/:id", userExtractor, async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  const user = req.user;
  const { message } = req.body;
  const alreadyApplied = project.applications.some(
    (app) => app.userId.toString() === user.id
  );
  if (alreadyApplied) {
    return res
      .status(400)
      .json({ error: "You have already applied to this project" });
  }
  const application = {
    userId: user.id,
    message,
  };
  project.applications.push(application);
  await project.save();
  res.status(200).json({
    message: "Application submitted successfully",
    data: project,
  });
});

// View Applied Projects
artistRoutes.get("/project", userExtractor, async (req, res) => {
  const userId = req.user.id;
  const projects = await Project.find({
    "applications.userId": userId,
  })
    .populate("postedBy", "username email")
    .populate("professions", "professionTitle");

  res.status(200).json(projects);
});

module.exports = artistRoutes;
