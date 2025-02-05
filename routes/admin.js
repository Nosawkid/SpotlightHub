const adminRoute = require("express").Router();
const Profession = require("../models/profession");
const Project = require("../models/project");

// Add Profession
adminRoute.post("/profession", async (req, res) => {
  const { professionTitle } = req.body;
  let newProfession = new Profession({
    professionTitle,
  });

  newProfession = await newProfession.save();
  res.status(201).json(newProfession);
});

// View All Profession
adminRoute.get("/profession", async (req, res) => {
  const professions = await Profession.find({});
  res.status(200).json(professions);
});

// Single Profession
adminRoute.get("/profession/:id", async (req, res) => {
  const { id } = req.params;
  const profession = await Profession.findById(id);
  res.status(200).json(profession);
});

// View all Projects
adminRoute.get("/projects", async (req, res) => {
  const projects = await Project.find({});
  res.status(200).json(projects);
});

module.exports = adminRoute;
