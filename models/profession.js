const mongoose = require("mongoose");
const { Schema } = mongoose;

const professionSchema = new Schema({
  professionTitle: {
    type: String,
    required: [true, "Profession title cannot be empty"],
    unique: true,
  },
});

professionSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Profession", professionSchema);
