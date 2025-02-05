const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["filmmaker", "artist", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      max: 5,
    },
    experience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    profession: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    workHistory: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        references: [
          {
            links: {
              type: String,
            },
            image: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
