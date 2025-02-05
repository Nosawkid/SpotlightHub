const mongoose = require("mongoose");
const { Schema } = mongoose;

const professionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Project title cannot be empty"],
  },
  description: {
    type: String,
    required: [true, "Project Description cannot be empty"],
    minLength: 10,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  professions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profession",
      required: [true, "Atleast one profession is mandatory"],
    },
  ],
  applications: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id cannot be empty"],
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      message: {
        type: String,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

professionSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

const Project = mongoose.model("Project", professionSchema);

module.exports = Project;
